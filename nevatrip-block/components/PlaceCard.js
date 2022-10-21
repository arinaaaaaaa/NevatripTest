import { useState } from "react";

import styles from "../styles/components/PlaceCard.module.scss"

function setFlagColor() {
    let color =  Math.floor(Math.random()*2);
    switch(color) {
        case 0: return {backgroundColor: "#099CE8", color: "#fff"}
        case 1: return {backgroundColor: "#FFD83B", color: "#323232"}
    }
}

export default function PlaceCard(props) {
    const [shownTimes, setShownTimes] = useState(false)
    let timesList

    if (shownTimes == false) {
        if (props.times.length <= 3) timesList = props.times
        else timesList = props.times.slice(0,2)
    }
    else timesList = props.times

    return (
        <div className={styles.cardContainer}>
            <div className={styles.imageSection} style={{backgroundImage: `url(${props.image})`}}>
                {props.flag ? <div style={setFlagColor()}>{props.flag}</div> : null}
            </div>
            <div className={styles.infoSection}>
                <p className={styles.title}>{props.title}</p>
                <div className={styles.time}>
                    <img src="icons/time.svg" alt="" />
                    <p>{props.time}</p>
                </div>
                <div className={styles.programList}>
                    {
                        props.list ? props.list.map((item) => 
                            props.list[props.list.length - 1] !== item ?
                            <ul className={styles.item}>
                                <li>{item}</li>
                            </ul>
                            :
                            <ul className={styles.item}>
                                <div className={styles.nearTime} style={{flexDirection: shownTimes ? 'column' : 'row', alignItems: shownTimes ? 'start' : 'center'}}>
                                    <li>{item}</li>
                                    {props.times ?
                                        <div className={styles.times} style={{marginLeft: shownTimes ? '2rem' : 0, marginTop: shownTimes ? '0.5rem' : '0'}}>
                                            {timesList.map((time) => <p className={styles.timeItem}>{time}</p>)}
                                            {props.times.length > 3 ? <button onClick={() => setShownTimes(!shownTimes)}>{!shownTimes? `ещё...` : `скрыть`}</button> : null}
                                        </div>
                                    : null}
                                </div>
                            </ul>
                        ) : null
                    }
                </div>
                <div className={styles.priceSection}>
                    <span>
                        <div className={styles.onlinePrice}>
                            {props.online} ₽
                        </div>
                        {props.offline ?
                            <div className={styles.offlinePrice}>
                                {props.offline} ₽ на причале
                            </div>
                        : null}
                    </span>
                    <button>Подробнее</button>
                </div>
            </div>
        </div>
    )
}