import React, { useEffect, useState } from 'react'
import "./marketleft.css"
import { Link } from 'react-router-dom'
import MarketModel from './MarketModel'

const MarketLeftBar = ({ handleSearch, searchItems, categories, getCategories, searchBycat, getAll }) => {
    useEffect(() => {
        getCategories()
    }, [])

    const [openModel,setModel] = useState(false);



    const closeModel = ()=>{
        setModel(false)
    }




    return (
        <>
        <div className='market-left_bar'>
            <span style={{ fontSize: "1.2rem" }}>Marketplace</span>

            <section className='search_section'>
                <form className='search_box'>
                    <input placeholder='Search...' onChange={handleSearch} />
                    <Link to="" onClick={searchItems}>
                        <button><img src="assets/icons/search.png" height={20} width={20} /></button>
                    </Link>


                </form>
            </section>

            <div className='market-left_links'>
                <div className='links-container' onClick={()=>{getAll( )}}>
                    <div className='market_links'>
                        <img src='/assets/icons/browseall.png' />
                    </div>
                    <span> Browse all</span>

                </div>

               


                <div className='links-container' style={{ backgroundColor: "#EBF5FF" }} onClick={()=>{setModel(true)}}>
                    <div className='market_links'>
                        <img src='/assets/icons/sell.png' />
                    </div>
                    <span>Sell items</span>

                </div>

                <hr />

                <div className='links-container'>
                    <div className='market_links'>
                        <img src='/assets/icons/filter.png' />
                    </div>
                    <span style={{ fontSize: "1.2rem" }}>Filters</span>
                </div>

                <hr />

                <div className='category_section'>
                    <div className='category_title_div'>
                        <div style={{ width: "45px", height: "45px", backgroundColor: "#E4E6EB", borderRadius: "50%", alignItems: "center", justifyContent: "center", display: "flex", flexWrap: "wrap" }}>
                            <img src='/assets/icons/category.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />

                        </div>
                        <span style={{ fontSize: "1rem" }}>Categories</span>

                    </div>

                    <section className='category_list'>

                        <div className='category'>

                        {categories.map((cat, key) => (
                            <div onClick={() => (searchBycat(cat.categoryTitle))} style={{display:"flex",flexWrap:"wrap", gap:"1vmax"}}>

                                {cat.categoryTitle == "Electronics" &&

                                    <div className='market-category-image-container'>
                                        <img src='/assets/icons/electronics.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>
                                }
                                {cat.categoryTitle == "Vehicles" &&

                                    <div className='market-category-image-container'>
                                        <img src='/assets/icons/vehicles.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>

                                }

                                {cat.categoryTitle == "Property for rent" &&

                                    <div className='market-category-image-container' >
                                        <img src='/assets/icons/forrent.png' style={{ width: "75%", height: "75%", objectFit: "cover" }} />
                                    </div>



                                }

                                {cat.categoryTitle == "Clothing"  &&
                                
                                <div className='market-category-image-container'>
                                <img src='/assets/icons/clothing.png' style={{width:"75%", height:"75%", objectFit:"cover"}}/>
                                </div>
                    
                                
                                }

                                {cat.categoryTitle == "Entertainment"  &&
                                
                                <div className='market-category-image-container'>
                                <img src='/assets/icons/entertainment.png' style={{width:"75%", height:"75%", objectFit:"cover"}}/>
                                </div>
                                
                                
                                }

                                {cat.categoryTitle == "Home goods"  && 
                                
                                <div className='market-category-image-container' >
                                <img src='/assets/icons/electronics.png' style={{width:"75%", height:"75%", objectFit:"cover"}}/>
                                </div>
                                
                                
                                }
                                {cat.categoryTitle == "Property for sale"  &&
                                
                                <div className='market-category-image-container'>
                                <img src='/assets/icons/forrent.png' style={{width:"75%", height:"75%", objectFit:"cover"}}/>
                                </div>
                                
                                
                                }

                                {cat.categoryTitle == "Free for sale"   &&
                                
                                <div className='market-category-image-container'>
                                <img src='/assets/icons/freeforsale.png' style={{width:"75%", height:"75%", objectFit:"cover"}}/>
                                </div>
                                
                                
                                }


                                <span className='market-category-span' key={key} value={cat.categoryTitle}>{cat.categoryTitle}</span>

                            </div>



                        ))}
                    </div>

                    </section>
                </div>


            </div>

        </div>
        <MarketModel open={openModel} onClose={closeModel} categories={categories} />
        </>
    )
}

export default MarketLeftBar
