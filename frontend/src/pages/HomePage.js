import React, { useState, useEffect } from 'react'
import bookService from '../services/books'
import recommendationService from '../services/recommendations'
import RecommendationList from '../components/recommendations/RecommendationList'
import PageTitle from '../components/PageTitle'
import PageSubtitle from '../components/PageSubtitle'
import LinkRow from '../components/recommendations/LinkRow'
import FilterRecommendation from '../components/recommendations/FilterRecommendations'

function HomePage() {
  const [books, setBooks] = useState([])
  const [videos, setVideos] = useState([])
  const [blogs, setBlogs] = useState([])

  const [filterType, setFilterType] = useState('All')
  const [filterTagField, setFilterTagField] = useState('')

  const filterOnChange = (e) => {
    setFilterType(e.target.value)
  } 

  const filterTagFieldHandler = (e) => {
    setFilterTagField(e.target.value)
  }

  const setRecommendations = (recommendations) => {
    setBooks(recommendations.book)
    setVideos(recommendations.video)
    setBlogs(recommendations.blog)
  }

  useEffect(() => {
    recommendationService
      .getRecommendations()
      .then(recommendations => {
        setRecommendations(recommendations)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (filterTagField) {
    recommendationService
      .getRecommendationsByTag(filterTagField)
      .then(recommendations => {
        setRecommendations(recommendations)
      })
      .catch(error => console.log(error))
    }
  }, [filterTagField])

  const markAsRead = async id => {
    const updatedBook = await bookService.markAsRead(id)
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)))
  }

  

  return (
    <main>
      <PageTitle title="Recommendations" />
      <PageSubtitle title="Add a Recommendation" />
      <LinkRow />
      <FilterRecommendation filterType={filterType} filterOnChange={filterOnChange} filterTagFieldHandler={filterTagFieldHandler}/>
      <RecommendationList books={books} videos={videos} blogs={blogs} markAsRead={markAsRead} />
    </main>
  )
}

export default HomePage
