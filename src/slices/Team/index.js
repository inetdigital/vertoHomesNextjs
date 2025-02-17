import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";

const Team = ({ slice }) => {
  const people = slice.primary.team_member;
  return (
    <Bounded as="section" paddingAs="fullWidthBlock">
      <div className="bg-vertoDarkBlue py-24 sm:py-32">
        <div className="mx-auto max-w-7xl text-center px-6 lg:px-0">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Meet our team
            </h2>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {people.map((person) => (
              <li
                key={person.name}
                className="rounded-2xl bg-white px-8 py-10 transition-all duration-500 ease-in-out scale-100 hover:scale-[1.04]"
              >
                {person.image?.url ? (
                  <PrismicNextImage
                    field={person.image}
                    className="mx-auto size-36 md:size-48 object-cover rounded-full border-4 border-vertoDarkBlue"
                    fallbackAlt="People at verto homes"
                  />
                ) : (
                  <div className="mx-auto size-48 md:size-56 object-cover rounded-full border-4 border-vertoDarkBlue relative bg-vertoDarkBlue">
                    <svg
                      className="w-12 h-12 text-gray-400 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute"
                      fill="#fff"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
                <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-vertoDarkBlue uppercase">
                  {person.name}
                </h3>
                <p className="text-sm/6 text-vertoDarkBlue">
                  {person.position}
                </p>
                {person.information && (
                  <div className="py-5 text-vertoDarkBlue">
                    <PrismicRichText
                      field={person.information}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="text-vertoDarkBlue text-sm mb-2">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                )}
                {person.linkedin?.url && (
                  <ul role="list" className="mt-6 flex justify-center gap-x-6">
                    <li>
                      <a
                        href={person.linkedin.url}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="size-5"
                        >
                          <path
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Bounded>
  );
};

export default Team;
