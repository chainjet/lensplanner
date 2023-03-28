import { useSchedulePost } from '@/hooks/chainjet.hooks'
import { CollectionSettings } from '@/utils/types'
import { Listbox, Transition } from '@headlessui/react'
import { CalendarIcon, CircleStackIcon, MusicalNoteIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/20/solid'
import { Loading, Tooltip } from '@nextui-org/react'
import { FormEvent, Fragment, useState } from 'react'
import { useAccount } from 'wagmi'
import CollectSettingsModal from './CollectSettingsModal'
import ScheduleModal from './ScheduleModal'
import SignInModal from './SignInModal'
import WalletAvatar from './WalletAvatar'

const uploadMediaOptions = [
  { name: 'Upload image(s)', value: 'image', icon: PhotoIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Upload video', value: 'video', icon: VideoCameraIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Upload audio', value: 'audio', icon: MusicalNoteIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  onPostScheduled: (workflowId: string) => void
}

export default function CreatePostForm({ onPostScheduled }: Props) {
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [collectSettingsModalOpen, setCollectSettingsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [post, setPost] = useState('')
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null)
  const [collectionSettings, setCollectionSettings] = useState<CollectionSettings>({ collect: 'anyone' })
  const { address } = useAccount()
  const { schedulePost } = useSchedulePost()

  async function handleSubmit(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    if (!post) {
      return
    }
    if (!scheduleDate && !formSubmitted) {
      setFormSubmitted(true)
      setScheduleModalOpen(true)
      return
    }
    setLoading(true)
    setSignInModalOpen(true)
  }

  const handleSignIn = async (lensCredentials: { id: string; name: string }) => {
    if (!scheduleDate) {
      setScheduleModalOpen(true)
      return
    }
    setSignInModalOpen(false)
    const templateData = {
      datetime: scheduleDate.toISOString(),
      content: post,
      ...collectionSettings,
    }
    const workflowId = await schedulePost('6421dc49f0e8d05438a6eed5', templateData, lensCredentials)
    setPost('')
    setLoading(false)
    setFormSubmitted(false)
    setScheduleDate(null)
    onPostScheduled(workflowId)
  }

  const handleSignInCancel = () => {
    setSignInModalOpen(false)
    setLoading(false)
  }

  const handleScheduleSelected = (date: Date) => {
    setScheduleModalOpen(false)
    setScheduleDate(date)
    if (formSubmitted) {
      handleSubmit()
    }
  }

  const handleCollectionSettingsChange = (settings: CollectionSettings) => {
    setCollectionSettings(settings)
    setCollectSettingsModalOpen(false)
  }

  const handleMediaOption = (option: typeof uploadMediaOptions[number]) => {
    console.log(`Upload ${option.value}`)
  }

  return (
    <div className="flex items-start space-x-4 bg-black" style={{ width: 600 }}>
      <div className="flex-shrink-0">{address && <WalletAvatar address={address} />}</div>
      <div className="flex-1 min-w-0">
        <form action="#" className="relative" onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="post" className="sr-only">
              Add your post
            </label>
            <textarea
              rows={3}
              name="post"
              id="post"
              className="block w-full resize-none border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
              placeholder="Add your post..."
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <Listbox onChange={handleMediaOption}>
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <Tooltip content={'Attach media'} rounded color="primary" placement="bottom">
                          <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                            <span className="flex items-center justify-center">
                              <PhotoIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
                              <span className="sr-only">Attach media</span>
                            </span>
                          </Listbox.Button>
                        </Tooltip>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 py-3 mt-1 -ml-6 text-base bg-gray-800 rounded-lg shadow w-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {uploadMediaOptions.map((option) => (
                              <Listbox.Option
                                key={option.value}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-600' : 'bg-gray-800',
                                    'relative cursor-default select-none py-2 px-3',
                                  )
                                }
                                value={option}
                              >
                                <div className="flex items-center cursor-pointer">
                                  <div
                                    className={classNames(
                                      option.bgColor,
                                      'flex h-8 w-8 items-center justify-center rounded-full',
                                    )}
                                  >
                                    <option.icon
                                      className={classNames(option.iconColor, 'h-5 w-5 flex-shrink-0')}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="block ml-3 font-medium truncate">{option.name}</span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <div className="flex items-center">
                <Tooltip content={'Collect Settings'} rounded color="primary" placement="bottom">
                  <button
                    onClick={() => setCollectSettingsModalOpen(true)}
                    type="button"
                    className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <CircleStackIcon className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">Collect Settings</span>
                  </button>
                </Tooltip>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center">
                <Tooltip content={'Set schedule'} rounded color="primary" placement="bottom">
                  <button
                    onClick={() => setScheduleModalOpen(true)}
                    type="button"
                    className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">Set schedule</span>
                  </button>
                </Tooltip>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? <Loading /> : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </form>
        {scheduleDate && (
          <div className="mt-2">
            <span className="text-sm">Scheduled at: {scheduleDate.toLocaleString()}</span>
          </div>
        )}
      </div>

      {signInModalOpen && <SignInModal open onCancel={handleSignInCancel} onSignIn={handleSignIn} />}
      {scheduleModalOpen && (
        <ScheduleModal open onCancel={() => setScheduleModalOpen(false)} onSchedule={handleScheduleSelected} />
      )}
      {collectSettingsModalOpen && (
        <CollectSettingsModal
          open
          onCancel={() => setCollectSettingsModalOpen(false)}
          onConfirm={handleCollectionSettingsChange}
        />
      )}
    </div>
  )
}
