import style from "./index.module.scss";
import videoSource from "../../assets/video/bg_video.mp4";
import {RefObject, useEffect, useRef, useState} from "react";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  const animationFrameId = useRef<number | null>(null); // 用于存储动画 ID

  const videoRef: RefObject<HTMLVideoElement | null> = useRef(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ballsRef = useRef<any[]>([]);

  const people = [
    "梁以宸", "王艺恒", "魏子欣", "胡峻恺", "张航", "马佳宁", "马玥婷", "王建博", "刘佳佳", "魏馨源",
    "张洛萌", "郭展言", "马嘉森", "崔浩桐", "庞翊彬", "赵文睿", "马浩鑫", "岳静淑", "张宸博", "花子煊",
    "马正宇", "崔轶群", "商子宁", "孔令轩", "李思涵", "周梓轩", "赵心怡", "孙泽宇", "韩明杰", "谢佳乐"
  ];

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  // 初始化小球数据
  useEffect(() => {
    const container = containerRef.current;
    const items = itemRefs.current;

    if (!container || items.length === 0) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const SIZE = 80;
    const SPEED = 6;

    ballsRef.current = items.map((el) => ({
      el,
      x: Math.random() * (containerWidth - SIZE),
      y: Math.random() * (containerHeight - SIZE),
      dx: (Math.random() - 0.5) * SPEED,
      dy: (Math.random() - 0.5) * SPEED,
    }));
  }, []);



  // 动画函数
  const animate = () => {

    if (!isPlayingRef.current) {
      cancelAnimationFrame(animationFrameId.current!); // 停止动画
      return;
    }



    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const SIZE = 80;

    ballsRef.current.forEach((ball) => {
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.x <= 0 || ball.x >= containerWidth - SIZE) ball.dx *= -1;
      if (ball.y <= 0 || ball.y >= containerHeight - SIZE) ball.dy *= -1;

      ball.el.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
    });

  };
  const startHandle = () => {
    setIsPlaying((prev) => {

      const next=!prev

      if(next){
        animate()
      }else {
        cancelAnimationFrame(animationFrameId)
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
                  ref={(el) => {
                    if (el) itemRefs.current[index] = el;
                  }}
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