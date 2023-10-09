'use client'

import React, { useEffect, useState } from 'react'

interface Props {
  title: string
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

const Modal: React.FC<Props> = (props) => {
  const { title = '', children, open = false, onClose } = props

  const [openState, setOpenState] = useState(open)

  const onCloseModal = () => {
    setOpenState(false)
    onClose?.()
  }

  useEffect(() => {
    if (open) {
      setOpenState(open)
    } else {
      onCloseModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    openState && (
      <div className="fixed w-full h-full top-0 flex justify-center">
        <div className="flex self-center w-4/12 h-fit flex-col p-4 bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center">
            <h1>{title}</h1>
            <button className="close" onClick={onCloseModal}>
              &times;
            </button>
          </div>
          <div className="flex flex-col w-full p-2">{children}</div>
        </div>
      </div>
    )
  )
}

export default Modal
