import React from 'react'
import { Link } from 'react-router-dom'
import { extractPaths } from 'react-router-to-array-ts'
import { RoutePropsObject } from 'react-router-to-array-ts/dist/esm/types'
import { ROUTES } from './routes'
import './style.css'

const Example = () => {
  const routeData = extractPaths(ROUTES)

  const groupedData = routeData.reduce((acc: { [key: string]: Array<RoutePropsObject> }, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = []
    }
    acc[curr.category].push(curr)
    return acc
  }, {})

  const sortedCategories = Object.keys(groupedData).sort()

  return (
    <div className='container'>
      {sortedCategories.map((category, index) => (
        <React.Fragment key={index}>
          <h2 className='sitemap-title'>{category}</h2>
          <ul className='sitemap'>
            {groupedData[category].map((item) => (
              <li key={item.path}>
                <Link className='sitemap-link' to={item.path}>
                  &raquo; {item.title} <span className='sitemap-url'>path:{item.path}</span>
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Example
