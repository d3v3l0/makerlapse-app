import React, { useState } from "react";
import { Layout } from "../Components/layout";

import { ReactComponent as WaitSVG } from "../wait.svg";
import { MdClose } from "react-icons/md";
import { ReactComponent as DoneSVG } from "../done.svg";

const { ipcRenderer } = window.require("electron");

export const VideoPage = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [videoPath, setVideoPath] = useState("");

  ipcRenderer.on("progress-update", (e, progressPercentage, path, isDone) => {
    setProgress(progressPercentage);
    setVideoPath(path);
    setDone(isDone);
  });

  return (
    <Layout>
      <header className="header__container">
        <div className="header__title">Video</div>
        <div className="header__quick-options">
          <MdClose onClick={() => ipcRenderer.send("hide-video")} />
        </div>
      </header>
      <div className="empty-state">
        {!done && (
          <>
            <WaitSVG width="200" height="200" />
            <div className="progress-circle" data-progress={progress}></div>
          </>
        )}
        {done && (
          <>
            <DoneSVG width="200" height="200" />
            <div>
              <button
                className="button button-primary"
                onClick={() => ipcRenderer.send("play-video", videoPath)}
              >
                Play Video
              </button>
              <button
                className="button button-secondary"
                onClick={() => ipcRenderer.send("open-video", videoPath)}
              >
                Reveal In Finder
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
