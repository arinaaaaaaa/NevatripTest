import styles from '../styles/Home.module.css'
import PlaceCard from '../components/PlaceCard';

export default function Home() {
  return (
    <div className="container">
      <div className="cardsList">
        <PlaceCard/>
        <PlaceCard/>
        <PlaceCard/>
        <PlaceCard/>
        <PlaceCard/>
      </div>
    </div>
  )
}
