import { collection } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

const useRoom  = (roomId,userId) => {

   const isUserRoom =  roomId.includes(userId);

  const doc = isUserRoom ? roomId?.replace(userId,'') : roomId;

  const [snapshot] = useDocument(collection(db,isUserRoom ? 'users' : 'rooms',doc));

 
if(!snapshot){
  console.log('snapshot is empty');
  return;
}
console.log('running')
return {
  id : snapshot.id,
  photoURL : snapshot.photoURL || `https://avatars.dicebear.com/api/human/${snapshot.id}.svg`,
  ...snapshot.data()
}
  
};

export default useRoom();