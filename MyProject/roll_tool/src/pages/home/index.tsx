import style from "./index.module.scss";
import videoSource from "../../assets/video/bg_video.mp4";
import { RefObject, useRef, useEffect } from "react";

const Home = () => {
  const videoRef: RefObject<HTMLVideoElement | null> = useRef(null);
  const people = ["小明", "小红", "小张", "小李", "小王"];
  useEffect(() => {
    if (videoRef) {
    }
  }, []);

  useEffect(() => {
    // 初始化每个人的位置
    const initialPersons = people.map((name) => ({
      name,
      x: Math.random() * 300, // 初始随机 x
      y: Math.random() * 300, // 初始随机 y
    }));
    setPersons(initialPersons);

    // 定时更新位置
    const timer = setInterval(() => {
      setPersons((prev) =>
        prev.map((person) => ({
          ...person,
          x: Math.max(0, Math.min(300, person.x + (Math.random() - 0.5) * 50)),
          y: Math.max(0, Math.min(300, person.y + (Math.random() - 0.5) * 50)),
        })),
      );
    }, 1000); // 每秒随机动一次

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={style.home}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        src={videoSource}
        muted={true}
        autoPlay
      ></video>
    </div>
  );
};

export default Home;
