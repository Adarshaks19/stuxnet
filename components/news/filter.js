import Classes from './filter.module.css'

function filter() {
    return (
        < div className={Classes.dropdown} >
            <button className={Classes.dropbtn}>Dropdown</button>
            <div className={Classes.dropDownContent}>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
        </div >
    )
}

export default filter;