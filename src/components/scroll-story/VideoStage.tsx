'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { STORY_STATES } from '@/data/projects';
import styles from './VideoStage.module.css';

interface VideoStageProps {
  progress: number;
}

const SEGMENT = 1 / STORY_STATES.length;
const TRANSITION_LENGTH = SEGMENT * 0.18; // 0.82 -> 1.00 of local chapter
const VIDEO_SCRUB_START = 0.12;
const VIDEO_SCRUB_END = 0.58;
const FINAL_FRAME_OFFSET = 0.04;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const VideoStage: React.FC<VideoStageProps> = ({ progress }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const renderedTimes = useRef<number[]>(STORY_STATES.map(() => 0));
  const targets = useRef<number[]>(STORY_STATES.map(() => 0));
  const [ready, setReady] = useState<boolean[]>(STORY_STATES.map(() => false));

  const layerStyles = useMemo(() => {
    const transitionIndex = STORY_STATES.findIndex((_, index) => {
      if (index === STORY_STATES.length - 1) return false;
      const chapterEnd = (index + 1) * SEGMENT;
      return progress >= chapterEnd - TRANSITION_LENGTH && progress <= chapterEnd;
    });

    if (transitionIndex >= 0) {
      const chapterEnd = (transitionIndex + 1) * SEGMENT;
      const transitionProgress = clamp((progress - (chapterEnd - TRANSITION_LENGTH)) / TRANSITION_LENGTH);
      const outgoingX = transitionIndex % 2 === 0 ? -100 : 100;

      return STORY_STATES.map((_, index) => {
        if (index === transitionIndex) {
          return {
            opacity: 1 - transitionProgress * 0.15,
            transform: `translate3d(${outgoingX * transitionProgress}%, 0, 0)`,
            zIndex: 2,
          };
        }
        if (index === transitionIndex + 1) {
          return {
            opacity: 1,
            transform: `translate3d(${-outgoingX * (1 - transitionProgress)}%, 0, 0)`,
            zIndex: 3,
            boxShadow: '0 0 50px rgba(0,0,0,.35)',
          };
        }
        return { opacity: 0, transform: 'translate3d(0, 0, 0)', zIndex: 0 };
      });
    }

    const currentIndex = Math.min(STORY_STATES.length - 1, Math.floor(progress / SEGMENT));
    return STORY_STATES.map((_, index) => ({
      opacity: index === currentIndex ? 1 : 0,
      transform: 'translate3d(0, 0, 0)',
      zIndex: index === currentIndex ? 2 : 0,
    }));
  }, [progress]);

  useEffect(() => {
    STORY_STATES.forEach((_, index) => {
      const video = videoRefs.current[index];
      if (!video || !Number.isFinite(video.duration)) return;
      const localProgress = clamp((progress - index * SEGMENT) / SEGMENT);
      const videoProgress = clamp((localProgress - VIDEO_SCRUB_START) / (VIDEO_SCRUB_END - VIDEO_SCRUB_START));
      targets.current[index] = videoProgress * Math.max(0, video.duration - FINAL_FRAME_OFFSET);
    });
  }, [progress, ready]);

  useEffect(() => {
    let frameId = 0;
    const render = () => {
      STORY_STATES.forEach((_, index) => {
        const video = videoRefs.current[index];
        if (!video || !ready[index]) return;
        const target = targets.current[index];
        const nextTime = renderedTimes.current[index] + (target - renderedTimes.current[index]) * 0.18;
        renderedTimes.current[index] = Math.abs(target - nextTime) < 0.01 ? target : nextTime;
        if (Math.abs(video.currentTime - renderedTimes.current[index]) > 0.008) {
          video.currentTime = renderedTimes.current[index];
        }
      });
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [ready]);

  return (
    <div className={styles.stageContainer} aria-hidden="true">
      <div className={styles.videoWrapper}>
        {STORY_STATES.map((state, index) => (
          <div key={state.id} className={styles.videoLayer} style={layerStyles[index]}>
            <video
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              src={state.videoSrc}
              muted
              playsInline
              preload="auto"
              className={styles.videoElement}
              onLoadedMetadata={(event) => {
                event.currentTarget.pause();
                renderedTimes.current[index] = 0;
                targets.current[index] = 0;
                setReady((current) =>
                  current.map((value, readyIndex) => (readyIndex === index ? true : value))
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStage;
