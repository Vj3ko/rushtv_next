import { signOut } from 'next-auth/react'
import { FaUserAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import styles from './UserInfo.module.scss'

const UserInfo = ({ user }: { user: any }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <FaUserAlt size={20} color='white' />
        <p>{user?.name}</p>
      </div>

      <div className={styles.flex}>
        <MdEmail size={20} color='white' />
        <p>{user?.email}</p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className={styles.signOut}>
        Sign out
      </button>
    </div>
  )
}

export default UserInfo
