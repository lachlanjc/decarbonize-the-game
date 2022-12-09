// Adapted from https://github.com/randombar164/ouchi_bar/blob/22ac67b4dcc538f4e1c7d5f7dde9bcf6fd5b2af1/frontend/src/utils/hooks/v2/useScan.ts
import type {
  QuaggaJSConfigObject,
  QuaggaJSResultObject,
} from '@ericblade/quagga2'
import Quagga from '@ericblade/quagga2'
import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react'
import useGameState, { CONSTANTS, type SourceName } from './state'

type ScanType = {
  onDetected: (code: string) => void
  scannerRef: RefObject<HTMLDivElement>
  onScannerReady?: () => void
  cameraId?: string
  facingMode?: string
  constraints?: MediaTrackConstraints
  locator?: QuaggaJSConfigObject['locator']
  decoders?: string[]
  locate?: boolean
  isPaused?: boolean
}

const defaultConstraints = {
  width: 640 * 1.5,
  height: 480 * 1.5,
}

const defaultLocatorSettings = {
  patchSize: 'medium',
  halfSample: true,
}

const defaultDecoders = ['code_39_reader']

const useScan = ({
  onDetected,
  scannerRef,
  onScannerReady,
  cameraId,
  facingMode = 'user',
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  decoders = defaultDecoders,
  locate = true,
  isPaused = false,
}: ScanType) => {
  const errorCheck = useCallback(
    (result: QuaggaJSResultObject) => {
      if (!onDetected) {
        return
      }
      if (typeof result.codeResult.code === 'string') {
        onDetected(result.codeResult.code)
      }
    },
    [onDetected]
  )

  useLayoutEffect(() => {
    if (isPaused) {
      return
    }
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            ...constraints,
            ...(cameraId && { deviceId: cameraId }),
            ...(!cameraId && { facingMode }),
          },
          target: scannerRef?.current!,
        },
        locator,
        numOfWorkers: navigator.hardwareConcurrency,
        decoder: { readers: decoders },
        locate,
      },
      (err) => {
        if (err) {
          return console.warn('Error starting Quagga:', err)
        }
        if (scannerRef && scannerRef.current) {
          Quagga.start()
          if (onScannerReady) {
            onScannerReady()
          }
        }
      }
    )
    Quagga.onDetected(errorCheck)
    return () => {
      Quagga.offDetected(errorCheck)
      Quagga.stop()
    }
  }, [
    cameraId,
    onDetected,
    onScannerReady,
    scannerRef,
    errorCheck,
    constraints,
    locator,
    decoders,
    locate,
    isPaused,
  ])

  return
}

export default function Scanner({ onPurchase }: { onPurchase: () => void }) {
  const gameState = useGameState()
  const scannerRef = useRef<HTMLDivElement>(null)
  useScan({
    onDetected: (result) => {
      const key = result?.toLowerCase() as SourceName
      const { year, installed } = gameState
      if (CONSTANTS.sourceNames.includes(key)) {
        console.log('RECOGNIZED', key)
        if (
          year > CONSTANTS.gameYearStart + 6 &&
          [year, year - 1, year - 2].includes(
            installed.filter(({ source }) => source === key).reverse()[0]?.year
          )
        ) {
          console.log('source recently purchased, punting')
        } else {
          gameState.purchase(key)
          onPurchase()
        }
      }
    },
    scannerRef,
    isPaused: gameState.isGameOver(),
  })

  return (
    <div className="hidden" aria-hidden>
      <div ref={scannerRef} />
    </div>
  )
}
