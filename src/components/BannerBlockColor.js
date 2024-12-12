import * as prismic from "@prismicio/client";

export const BannerBlockColor = ({ theme, title, caption }) => {
  const textColorClass =
    {
      VertoBlue: "vertoLightBlue",
      VertoGreen: "vertoLightGreen",
    }[theme] || "vertoLightBlue";
  const bgColorClass =
    {
      VertoBlue: "vertoDarkBlue",
      VertoGreen: "vertoDarkGreen",
    }[theme] || "vertoDarkBlue";
  return (
    <div
      className={`h-auto overflow-hidden relative flex flex-col items-center justify-center bg-${bgColorClass} pt-64 pb-64`}
    >
      <div>
        <div className="max-w-lg mx-auto">
          <h1 className="text-white uppercase text-center tracking-widest leading-tight">
            {Array.isArray(title) ? prismic.asText(title) : title}
          </h1>
        </div>
        <hr
          className={`h-[3px] w-20 border-0 bg-${textColorClass} mt-8 mx-auto`}
        />
        {caption && (
          <div className="max-w-xl mt-8">
            <p className="text-white font-normal text-lg lg:text-2xl text-center">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
