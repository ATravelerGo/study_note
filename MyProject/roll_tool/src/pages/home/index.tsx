import style from "./index.module.scss";
import videoSource from "../../assets/video/bg_video.mp4";
import { RefObject, useEffect, useRef, useState } from "react";
interface Ball {
  el: HTMLDivElement;
  x: number;
  y: number;
  dx: number;
  dy: number;
}
const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationId = useRef<number | null>(null);
  const videoRef: RefObject<HTMLVideoElement | null> = useRef(null);
  const divItemRef = useRef<any[]>([]);
  const people = [
    "梁以宸",
    "王艺恒",
    "魏子欣",
    "胡峻恺",
    "张航",
    "马佳宁",
    "马玥婷",
    "王建博",
    "刘佳佳",
    "魏馨源",
    "张洛萌",
    "郭展言",
    "马嘉森",
    "崔浩桐",
    "庞翊彬",
    "赵文睿",
    "马浩鑫",
    "岳静淑",
    "张宸博",
    "花子煊",
    "马正宇",
    "崔轶群",
    "商子宁",
    "孔令轩",
    "李思涵",
    "周梓轩",
    "赵心怡",
    "孙泽宇",
    "韩明杰",
    "谢佳乐",
  ];
  useEffect(() => {
    if (!containerRef || divItemRef.current.length === 0) return;

    const containerWidth = containerRef.current!.clientWidth;
    const containerHeight = containerRef.current!.clientHeight;
    const SIZE = 80;
    const SPEED = 6;

    console.log("divItemRef.current", divItemRef.current);

    // 更新每个小球的位置和速度
    divItemRef.current.forEach((ball) => {
      ball.x = Math.random() * (containerWidth - SIZE);
      ball.y = Math.random() * (containerHeight - SIZE);
      ball.dx = (Math.random() - 0.5) * SPEED;
      ball.dy = (Math.random() - 0.5) * SPEED;
    });
  }, []);

  // 动画函数
  const animate = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const SIZE = 80;
    const SPEED = 6;

    divItemRef.current.forEach((ball: any) => {
      ball.dx = (Math.random() - 0.5) * SPEED;
      ball.dy = (Math.random() - 0.5) * SPEED;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // 边界检测
      if (ball.x <= 0 || ball.x >= containerWidth - SIZE) ball.dx *= -1;
      if (ball.y <= 0 || ball.y >= containerHeight - SIZE) ball.dy *= -1;

      ball.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
    });

    animationId.current = requestAnimationFrame(animate);
  };
  const startHandle = () => {
    setIsPlaying((prev) => {
      const next = !prev;

      if (next) {
        videoRef.current?.play();
        animate();
      } else {
        videoRef.current?.pause();
        if (animationId.current !== null) {
          cancelAnimationFrame(animationId.current); // 取消动画
        }
      }

      return next;
    });
  };

  return (
    <div className={style.home}>
      <div onClick={startHandle} className={style.startBtn}>
        {isPlaying ? "暂停" : "开始"}
      </div>

      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        src={videoSource}
      />

      <main ref={containerRef} className={style.home_main}>
        {people.map((item, index) => (
          <div
            key={item}
            ref={(el) => (divItemRef.current[index] = el)}
            className={style.home_main_item}
          >
            {item}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
