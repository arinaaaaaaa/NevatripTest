import styles from '../styles/Home.module.scss'
import PlaceCard from '../components/PlaceCard';

export default function Home() {
  return (
    <div className="container">
      <div className="cardsList">
        <PlaceCard image="/images/place1.jpg"/>
        <PlaceCard/>
        <PlaceCard/>
        <PlaceCard/>
        <PlaceCard/>
      </div>
    </div>
  )
}
