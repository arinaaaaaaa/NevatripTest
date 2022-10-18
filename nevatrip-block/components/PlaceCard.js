import styles from "../styles/components/PlaceCard.module.scss"

function setFlagColor() {
    let color =  Math.floor(Math.random()*2);
    switch(color) {
        case 0: return {backgroundColor: "#099CE8", color: "#fff"}
        case 1: return {backgroundColor: "#FFD83B", color: "#323232"}
    }
}

export default function PlaceCard(props) {
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
                <ul className={styles.programList}>
                    {
                        props.list ? props.list.map((item) => 
                            props.list[props.list.length - 1] !== item ? <li className={styles.item}>{item}</li> :
                            <li className={styles.item}>
                                <div>
                                    {item}
                                    {props.times ? props.times.map((time) => 
                                        <p>{time}</p>
                                    ) : null}
                                </div>
                            </li>
                        ) : null
                    }
                </ul>
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