import { useState, useEffect } from 'react'
import Select from 'react-select';
import {diractions, timesAB, timesBA, counter, durationAB, costOneDiraction, costTwoDiractions} from "../common/data.js";
import { customStyles, customStylesFirst, customStylesLast } from "../common/styles.js";
import styles from '../styles/Home.module.scss';

function getDate(time) {
  var now = new Date();
  var nowDateTime = now.toISOString();
  var nowDate = nowDateTime.split('T')[0];
  if (typeof(time) == "string" && time.split(":")[0] < 10) {
    var dateArray = nowDate.split("-")
    dateArray[2] = (parseInt(nowDate.split("-")[2]) + 1).toString()
    nowDate = dateArray.join("-")
  }
  else if (typeof(time) == "object" && time.value.split(":")[0] < 10) {
    var dateArray = nowDate.split("-")
    dateArray[2] = (parseInt(nowDate.split("-")[2]) + 1).toString()
    nowDate = dateArray.join("-")
  }
  return new Date(nowDate + 'T' + time);
}

function getFinishTime(stringTime, duration = durationAB) {
  let hours = parseInt(duration / 60);
  let minutes = duration % 60;

  let target = getDate(stringTime);
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
  let target = getDate(startTime)
  return (finishTime - target)/60000
}

function filterTime(timeArray, startArrayTime, startTime) {
  let index = 0;
  for (let i in startArrayTime) {
    if (startArrayTime[i].value == startTime) {
      index = i;
      break;
    }
  }

  const finishTime = getFinishTime(startArrayTime[index].value)
  console.log(finishTime)
  let filteredArray = []

  for (let i = 0; i < timeArray.length; i++) {
    let target = getDate(timeArray[i].value);
    if (target > finishTime) filteredArray.push(timeArray[i])
  }
  return filteredArray
}

export default function Home() {  
  const [timeArrayBA, setTimeArrayBA] = useState("")
  const [timeArrayAB, setTimeArrayAB] = useState("")

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
    if (!(filterTime(timeBA, newTime).find(e => e.value == timeBA && e.label == timeBA))) setTimeBA("")
  }

  function toLocalTime(time) {
    let copiedTime = time.map(timeObj => Object.assign({}, timeObj))

    let currentTimezone = (new Date().getTimezoneOffset() * (-1) - 3 * 60)/60;

    for (let i = 0; i < copiedTime.length; i++) {
      let target = getDate(copiedTime[i].value)
      target.setHours(target.getHours() + currentTimezone)
      copiedTime[i].value = (target.getHours() < 10 ? "0": "") + target.getHours() + ":" + (target.getMinutes() < 10 ? "0": "") + target.getMinutes()
      copiedTime[i].label = (target.getHours() < 10 ? "0": "") + target.getHours() + ":" + (target.getMinutes() < 10 ? "0": "") + target.getMinutes()
      copiedTime[i].date = (target.getDate() + "-" + target.getMonth() + "-" + target.getFullYear())
    }
    return copiedTime;
  }

  useEffect(() => {
    setTimeArrayAB(toLocalTime(timesAB));
    setTimeArrayBA(toLocalTime(timesBA));
  }, []);

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
                  options={timeArrayBA}
                  onChange={e => setTimeBA(e.value)}
                  styles={customStyles}
                />
              </>
            : diraction != "" ?
              <>
                <Select
                  placeholder="Время отправления"
                  options={timeArrayAB}
                  onChange={e => changeStartTime(e.value)}
                  styles={customStyles}
                />
              </>
            : null }
            {
              diraction === "из A в B и обратно в А" && timeAB !== "" ?
                <Select
                  placeholder="Время возвращения"
                  options={filterTime(timeArrayBA, timeArrayAB, timeAB)}
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
