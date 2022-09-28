export const LoginBox = () => {
  return (
    <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
      <div className="my-3 text-4xl font-bold tracking-wider text-center">
        <a href="#">Streammmm</a>
      </div>
      <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
        Welcome to Streammmm. Login and start streaming!
      </p>
      <p className="flex flex-col items-center justify-center mt-10 text-center">
        <span>Don't have an account?</span>
        <a href="#" className="underline">
          Get Started!
        </a>
      </p>
      <p className="mt-6 text-sm text-center text-gray-300">
        Read our
        <a href="#" className="underline">
          terms
        </a>
        and
        <a href="#" className="underline">
          conditions
        </a>
      </p>
    </div>
  );
};
