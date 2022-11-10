import NewsItem from './NewsItem';
import classes from './NewsList.module.css';
import Heading from './Header'
import Filter from './filter';

function NewsList(props) {
    return (
        <>
            <div className={classes.kya}>  <Heading />
                {/* <Filter /> */}

            </div>

            <ul className={classes.list}>
                {props.data.map((details) => (
                    <NewsItem
                        key={details.id}
                        id={details.id}
                        image={details.image}
                        title={details.title}
                        date={details.date}
                    />
                ))}
            </ul>
        </>
    );
}

export default NewsList;
