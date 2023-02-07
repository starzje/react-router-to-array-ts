# React Router To Array Typescript

A library that helps you get helpful information from react-routers <Route> by extracting paths (and other custom properties) to an array, which can be helpful if you are creating SSG/blogs, and need to list out all of your routes somewhere (and add properties like category, title, etc.)

## Live preview of example

Example code on the bottom of the README page -> [preview link](https://react-router-to-array-ts-example.netlify.app/)

## Installation

Use package manager to install react-router-to-array-ts.

```bash
npm install react-router-to-array-ts
```

or

```bash
yarn add react-router-to-array-ts
```

## Usage

Add all of your routes to a variable
routes.tsx file

```java
export const ROUTES = (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='about' element={<About />} />
    <Route path='contact' element={<Contact />} />
   </Routes>
 )
```

Be sure to add custom property handle in your routes, where you can add title and category (or just leave them blank, but they have to be included)

```javascript
handle{{ title: "Title goes here", category: "category goes here" }}
```

Also don't add any slahes "/" to your paths at beginning or at the end, react-router-to-array-ts will do that for you

```javascript
path = 'user/userid'
// becomes
path = '/user/userid/'
```

Your final routes.tsx file should look somewhat similar to this:

```java
export const ROUTES =
<Routes>
    <Route handle={{ title: 'About', category: 'information' }} path='about' element={<About />} />
    <Route handle={{ title: 'Contact', category: 'information' }} path='contact' element={<Contact />} />
    <Route handle={{ title: 'User menu', category: 'User' }} path='user'>
      <Route index={true} element={<Users />} />
      <Route handle={{ title: 'User - Avatar', category: 'User' }} path='avatar' element={<UserAvatar />} />
      <Route handle={{ title: 'User - Settings ', category: 'User' }} path='settings' element={<UserSettings />} />
    </Route>
    <Route handle={{ title: 'Homepage with no category', category: '' }} path='/' element={<Home />} />
  </Routes>
```

Add extractPaths function from react-router-to-array-ts to use it
Example.tsx file

```javascript
import { extractPaths } from 'react-router-to-array-ts'
import { ROUTES } from './routes'

const routeData = extractPaths(ROUTES)

console.log(routeData)[
  //result:
  ({
    path: '/about/',
    category: 'information',
    title: 'About',
  },
  {
    path: '/contact/',
    category: 'information',
    title: 'Contact',
  },
  {
    path: '/user',
    category: 'User',
    title: 'User menu',
  },
  {
    path: '/user/avatar/',
    category: 'User',
    title: 'User - Avatar',
  },
  {
    path: '/user/settings/',
    category: 'User',
    title: 'User - Settings ',
  },
  {
    path: '/',
    category: '',
    title: 'Homepage with no category',
  })
]
```

## Example of usage

```typescript
import React from 'react'
import { Link } from 'react-router-dom'
import { extractPaths } from 'react-router-to-array-ts'
import { RoutePropsObject } from 'react-router-to-array-ts/dist/esm/types'
import { ROUTES } from './routes'

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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
