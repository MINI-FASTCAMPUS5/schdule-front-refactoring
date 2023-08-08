import useUser from '@/hooks/user'
import React from 'react'
import AdminActionBar from '@/components/AdminActionBar'
import UserActionBar from '@/components/UserActionBar'
import Profile from '@/components/sidebar/Profile'
import SearchForm from '@/components/SearchForm'
import SideBarAd from './SideBarAd'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { DATE_ROUTE_FORMAT } from '@/constants'

export default function SideBar() {
  const { getUserInfo } = useUser()
  const user = getUserInfo()

  const handleSubmit = (value: string) => {
    alert(value + '를 검색합니다.')
  }

  return (
    <aside
      className={`sticky mt-2 left-2 mb-2 flex flex-col min-w-[290px] max-w-[290px] max-h-[calc(100vh_-_1rem)] min-h-[860px] pt-6 rounded-[20px] bg-main z-[60]
      transition-all ease-out duration-75`}
    >
      <div className='mb-8'>
        <Link to={`/calendar/${dayjs(new Date()).format(DATE_ROUTE_FORMAT)}`}>
          <img className='m-auto' src='/yearly_idol.png' width='240px' alt='연간 아이돌' />
        </Link>
      </div>
      <div className='mb-4'>
        <SearchForm onSubmit={handleSubmit} />
      </div>
      {user.role === 'USER' && <UserActionBar />}
      {user.role === 'ADMIN' && <AdminActionBar />}
      {/* todo : useUser hooks를 내부에서 호출할지 정하자, 그리고 버튼 디자인 정해지면 버튼은 재사용 가능하게 변경하지*/}
      <div className='mb-auto overflow-y-scroll scrollbar-hide border-dotted border-y-2 border-white'>
        <SideBarAd />
      </div>
      <Profile user={user} />
    </aside>
  )
}
