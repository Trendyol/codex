import Card from '@components/ui/Card';

const Dino = () => {
  return (
    <Card className="h-[432px]">
      <div className="h-[372px] relative">
        <iframe
          className="absolute w-full h-full z-50 rounded-md"
          src="https://chromedino.com/"
          scrolling="no"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      </div>
      <div></div>
    </Card>
  );
};

export default Dino;
