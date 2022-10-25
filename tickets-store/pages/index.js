import { useState } from 'react'
import Select from 'react-select';
import {diractions, timesAB, timesBA, counter, durationAB, costOneDiraction, costTwoDiractions} from "../common/data.js";
import { customStyles, customStylesFirst, customStylesLast } from "../common/styles.js";
import styles from '../styles/Home.module.scss';

function getFinishTime(stringTime, duration = durationAB) {
  let hours = parseInt(duration / 60);
  let minutes = duration % 60;

  var now = new Date();
  var nowDateTime = now.toISOString();
  var nowDate = nowDateTime.split('T')[0];
  var target = new Date(nowDate + 'T' + stringTime);

  target.setHours(target.getHours() + hours);
  target.setMinutes(target.getMinutes() + minutes);

  return(target);
}

function getResult(tickets, diraction, startTimeAB, startTimeBA) {

  let finishTime = ""

  if (diraction === "из A в B") finishTime = getFinishTime(startTimeAB)
  else if (diraction === "из B в A") finishTime = getFinishTime(startTimeBA)
  else finishTime = getFinishTime(startTimeAB, getDuration(startTimeAB, startTimeBA))

  const hours = finishTime.getHours()
  const minutes = (finishTime.getMinutes() < 10 ? '0': '') + finishTime.getMinutes()

  return (
    <>
      <p>Вы выбрали {tickets} билета по маршруту {diraction} стоимостью {diraction !== "из A в B и обратно в А" ? tickets*costOneDiraction : tickets*costTwoDiractions}р.</p>
      <p>Это путешествие займет у вас { diraction !== "из A в B и обратно в А" ? durationAB : getDuration(startTimeAB, startTimeBA)} минут.</p>
      <p>Теплоход отправляется в {diraction === "из B в A" ? startTimeBA : startTimeAB}, а прибудет в {hours + ":" + minutes}.</p>
    </>
  )
}

function getDuration(startTime, secondTime) {
  let finishTime = getFinishTime(secondTime)

  var now = new Date();
  var nowDateTime = now.toISOString();
  var nowDate = nowDateTime.split('T')[0];
  var target = new Date(nowDate + 'T' + startTime);
  console.log((finishTime - target)/60000)
  return (finishTime - target)/60000

}

function filterTime(timeArray, startTime) {
  const finishTime = getFinishTime(startTime)
  let filteredArray = []

  for (let i = 0; i < timeArray.length; i++) {
    var now = new Date();
    var nowDateTime = now.toISOString();
    var nowDate = nowDateTime.split('T')[0];
    var target = new Date(nowDate + 'T' + timeArray[i].value);
    if (target > finishTime) filteredArray.push(timeArray[i])
  }

  return filteredArray
}

export default function Home() {
  const [diraction, setDiraction] = useState("из A в B")
  const [timeBA, setTimeBA] = useState("")
  const [timeAB, setTimeAB] = useState("")
  const [ticketsNum, setTicketsNum] = useState(0)
  const [showResult, setShowResult] = useState(false)

  function changeDiraction(newDiraction) {
    setDiraction(newDiraction);
    setTimeAB("");
    setTimeBA("");
    setTicketsNum(0);
    setShowResult(false);
  }
  function changeStartTime(newTime) {
    setTimeAB(newTime)
    if (!(filterTime(timesBA, newTime).find(e => e.value == timeBA && e.label == timeBA))) setTimeBA("")
  }

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
                onChange={e => changeDiraction(e.value)}
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
                  onChange={e => changeStartTime(e.value)}
                  styles={customStyles}
                />
              </>
            : null }
            {
              diraction === "из A в B и обратно в А" && timeAB !== "" ?
                <Select
                  placeholder="Время возвращения"
                  options={filterTime(timesBA, timeAB)}
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
