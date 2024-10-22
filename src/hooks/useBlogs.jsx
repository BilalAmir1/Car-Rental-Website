import React from 'react'
import { useQuery } from 'react-query'
import { getAllBlogs } from '../utils/api'

const useBlogs = () => {

  const{data, isError, isLoading, refetch}=useQuery(
    "allblogs", getAllBlogs, {
      refetchOnWindowFocus: false
    }
  )
  return {
    data, isError, isLoading, refetch
  }
}

export default useBlogs