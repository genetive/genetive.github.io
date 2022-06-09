import Link from 'next/link';

const MyApp = () => {
  return (
    <div>
      Hello World. 
        <Link href='/about' as={ process.env.BACKEND_URL + '/about'}>
          <a>About</a>
        </Link>
    </div>
  );  
};

export default MyApp;
