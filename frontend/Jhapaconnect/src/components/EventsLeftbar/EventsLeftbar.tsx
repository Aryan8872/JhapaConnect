import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./eventleft.css"

const EventsLeftbar = ({ searchEvents, handleSearch, categories, searchBycat, getCategories, OpenModal, getAll }) => {

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className='event-left_bar'>
            <div className='event-left_bar_upper'>
                <span style={{ fontSize: "1.2rem" }}>Events</span>

                <section className='event-search_section'>
                    <form className='event-search_box'>
                        <input placeholder='Search...' onChange={handleSearch} />
                        <Link to="" onClick={searchEvents}>
                            <button><img src="assets/icons/search.png" height={20} width={20} /></button>
                        </Link>


                    </form>
                </section>

            </div>


            <div className='event-left_links'>
                <div className='event-links-container' >
                    <div className='event_links'>
                        <img src='/assets/icons/browseall.png' />
                    </div>
                    <span> Browse all</span>

                </div>




                <div className='event-links-container' style={{ backgroundColor: "#EBF5FF" }} onClick={() => { OpenModal() }}>
                    <div className='event_links'>
                        <img src='/assets/icons/sell.png' />
                    </div>
                    <span>Create event</span>

                </div>

                <hr />



                <div className='event-links-container'>
                    <div className='event_links'>
                        <img src='/assets/icons/filter.png' />
                    </div>
                    <span style={{ fontSize: "1.2rem" }}>Filters</span>
                </div>

                <hr />
                <div className='event-category_section'>
                <div className='event-category_title_div'>
                    <div style={{ width: "45px", height: "45px", backgroundColor: "#E4E6EB", borderRadius: "50%", alignItems: "center", justifyContent: "center", display: "flex", flexWrap: "wrap" }}>
                        <img src='/assets/icons/category.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />

                    </div>
                    <span style={{ fontSize: "1rem" }}>Categories</span>

                </div>

                <section className='event-category_list'>
                    <div className='event-category'>
                        {categories && categories.map((cat, key) => (
                            <div key={key} onClick={() => (searchBycat(cat.categoryTitle))} className='event-category-name'>

                                {cat.categoryTitle == "Health & Medical" &&

                                    <div className='event-image-container'>
                                        <img src='/assets/icons/health.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>
                                }
                                {cat.categoryTitle == "Sports" &&

                                    <div className='event-image-container'>
                                        <img src='/assets/icons/sports.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>

                                }

                                {cat.categoryTitle == "Religious" &&

                                    <div className='event-image-container'>
                                        <img src='/assets/icons/religious.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>



                                }

                                {cat.categoryTitle == "Cultural program" &&

                                    <div className='event-image-container'>
                                        <img src='/assets/icons/cultural.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>


                                }

                                {cat.categoryTitle == "Games" &&

                                    <div className='event-image-container'>
                                        <img src='/assets/icons/games.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>


                                }
                                {cat.categoryTitle == "Programme" &&

                                    <div className='event-image-container'>
                                        <img src='/assets/icons/program.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>


                                }




                                <span className='event-category-span' key={key} value={cat.categoryTitle}>{cat.categoryTitle}</span>

                            </div>


                        ))}
                    </div>

                </section>
            </div>

            </div>

            


        </div>

    )
}

export default EventsLeftbar
