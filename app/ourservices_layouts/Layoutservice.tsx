import Link from 'next/link';

interface LayoutServiceProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function Layoutservice({ title, description, buttonText, buttonLink }: LayoutServiceProps) {
  return (
    <section className="container px-2 lg:px-[30px] mx-auto">
      <div className="py-7">
        <div className="text-center text-3xl font-black py-2 pb-4">
          <h1>{title}</h1>
        </div>
        <p className="text-center py-2">{description}</p>
        <div className="flex justify-center py-4">
          <Link href={buttonLink}>
            <button
              className="bg-[#b5a580] text-white px-3 py-2 tracking-widest rounded-lg hover:bg-[#a09470] transition-colors duration-300"
              aria-label={`Navigate to ${buttonText}`}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}