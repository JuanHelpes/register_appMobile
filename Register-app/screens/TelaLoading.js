import Lottie from 'lottie-react-native';
import { useRef } from 'react';
import { BackHandler } from 'react-native';

export function TelaLoading() {
  const animation = useRef(null);

  // useEffect(() => {
  // BackHandler.addEventListener('backPress', () => true)
  // return () => BackHandler.removeEventListener('backPress', () => true)
  // }, [])

  return (
    <Lottie
      autoPlay
      ref={animation}
      source={require('../assets/loading.json')}
    />
  );
}
