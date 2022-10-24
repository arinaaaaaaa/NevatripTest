import { useState } from 'react'
import Select from 'react-select';
import {diractions, timesAB, timesBA, counter, durationAB, costOneDiraction, costTwoDiractions} from "../common/data.js";
import { customStyles, customStylesFirst, customStylesLast } from "../common/styles.js";
import styles from '../styles/Home.module.scss';

function getResult(tickets, diraction, startTimeAB, startTimeBA) {
  console.log(startTimeAB)
  return (
    <>
      <p>Вы выбрали {tickets} билета по маршруту {diraction} стоимостью {tickets*costOneDiraction}р.</p>
      <p>Это путешествие займет у вас {durationAB} минут.</p>
      <p>Теплоход отправляется в {startTimeAB}, а прибудет в 18-00.</p>
    </>
  )
}

export default function Home() {
  const [diraction, setDiraction] = useState("из A в B")
  const [timeBA, setTimeBA] = useState("")
  const [timeAB, setTimeAB] = useState("")
  const [ticketsNum, setTicketsNum] = useState(0)
  const [showResult, setShowResult] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.titleSection}>
          <p>Поиск водных экскурсий по Питеру</p>
          <p>Лучший свособ купить билеты</p>
        </div>
        <div className={styles.content}>
          <div className={styles.orderInfo}>
              <Select
                placeholder="Направление"
                options={diractions}
                onChange={e => setDiraction(e.value)}
                styles={customStylesFirst}
              />
            { diraction === "из B в A" ?
            <>
                <Select
                  placeholder="Время отправления"
                  options={timesBA}
                  onChange={e => setTimeBA(e.value)}
                  styles={customStyles}
                />
              </>
            : diraction != "" ?
              <>
                <Select
                  placeholder="Время отправления"
                  options={timesAB}
                  onChange={e => setTimeAB(e.value)}
                  styles={customStyles}
                />
              </>
            : null }
            {
              diraction === "из A в B и обратно в А" ?
                <Select
                  placeholder="Время возвращения"
                  options={timesBA}
                  onChange={e => setTimeBA(e.value)}
                  styles={customStyles}
                />
            : null }
            <Select
              placeholder="Количество билетов"
              options={counter}
              onChange={e => setTicketsNum(e.value)}
              styles={customStylesLast}
            />
            {
              ((diraction !== "" && diraction !== "из A в B и обратно в А") && (timeAB !== "" || timeBA !== "") && ticketsNum !== 0) ||
              ((diraction !== "" && diraction === "из A в B и обратно в А") && (timeAB !== "" && timeBA !== "") && ticketsNum !== 0) ?
              <button onClick={() => setShowResult(true)}>Посчитать</button> :
              <button disabled>Посчитать</button>
            }
          </div>
          { showResult ? <p className={styles.result}>{getResult(ticketsNum, diraction, timeAB, timeBA)}</p> : null}
        </div>
      </div>
      </div>
  )
}
