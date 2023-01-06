'use client'
import MuxVideo from '@mux/mux-video-react';

export default function Video() {
  return (
    <MuxVideo
      style={{ height: '100%', maxWidth: '100%' }}
      className="rounded-md"
      playbackId="Kpe2hpja01k02F4obzwoe9aLPOa9NJLIXtCKPhNDsJkPI"
      streamType="on-demand"
      poster="https://image.mux.com/Kpe2hpja01k02F4obzwoe9aLPOa9NJLIXtCKPhNDsJkPI/thumbnail.jpg?width=1024&fit_mode=pad&time=0"
      controls
    />
  )
}
