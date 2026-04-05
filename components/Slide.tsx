interface SlideProps {
  data: {
    title: string
    description: string
    image: string
  }
  active: boolean
}

export default function Slide({ data, active }: SlideProps) {
  return (
    <div
      className={`
        absolute inset-0 transition-opacity duration-1000
        ${active ? "opacity-100 z-10" : "opacity-0 z-0"}
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full mt-25 px-6 ">
        <div
          className={`
            max-w-xl text-white 
            transition-all duration-1000
            ${active ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
          `}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line ">
            {data.title}
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  )
}
