import styles from '../styles/Home.module.scss'
import PlaceCard from '../components/PlaceCard';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.cardsList}>
      <PlaceCard
          image="/images/place2.jpg"
          flag="НОВИНКА"
          time="2 часа"
          title="Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020"
          list={[
            "Билет на целый день",
            "Неограниченное количество катаний",
            "6 остановок у главных достопримечательностей",
            "Ближайшие рейсы сегодня"
          ]}
          times={["12:00", "12:00", "12:00"]}
          online="900"
          offline="1200"
        />
        <PlaceCard
          image="/images/place3.jpg"
          flag="КРУГЛЫЙ ГОД"
          time="2 часа"
          title="Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020"
          list={[
            "Билет на целый день",
            "Неограниченное количество катаний",
            "6 остановок у главных достопримечательностей",
            "Ближайшие рейсы сегодня"
          ]}
          times={["12:00", "12:00", "12:00"]}
          online="900"
          offline="1200"
        />
        <PlaceCard
          image="/images/place4.jpg"
          time="2 часа"
          title="Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020"
          list={[
            "Билет на целый день",
            "Неограниченное количество катаний",
            "6 остановок у главных достопримечательностей",
            "Ближайшие рейсы сегодня"
          ]}
          times={["12:00", "12:00", "12:00"]}
          online="900"
          offline="1200"
        />
        <PlaceCard
          image="/images/place1.jpg"
          flag="НОВИНКА"
          time="2 часа"
          title="АКЦИЯ - Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2019"
          list={[
            "Билет на целый день",
            "Неограниченное количество катаний",
            "6 остановок у главных достопримечательностей",
            "Ближайшие рейсы сегодня"
          ]}
          times={["12:00", "12:00", "12:00"]}
          online="900"
          offline="1200"
        />
      </div>
    </div>
  )
}
