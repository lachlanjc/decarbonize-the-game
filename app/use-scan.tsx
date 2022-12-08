// Adapted from https://github.com/randombar164/ouchi_bar/blob/22ac67b4dcc538f4e1c7d5f7dde9bcf6fd5b2af1/frontend/src/utils/hooks/v2/useScan.ts
import type {
  QuaggaJSConfigObject,
  QuaggaJSResultObject,
} from '@ericblade/quagga2'
import Quagga from '@ericblade/quagga2'
import type { RefObject } from 'react'
import { useCallback, useLayoutEffect } from 'react'

type ScanType = {
  onDetected: (code: string) => void
  scannerRef: RefObject<HTMLDivElement>
  onScannerReady?: () => void
  cameraId?: string
  facingMode?: string
  constraints?: MediaTrackConstraints
  locator?: QuaggaJSConfigObject['locator']
  numOfWorkers?: number
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
  numOfWorkers = navigator.hardwareConcurrency || 0,
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
        numOfWorkers,
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

export default useScan