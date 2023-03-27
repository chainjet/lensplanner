import { Button, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'
import ScheduleSelector from './ ScheduleSelector'

interface Props {
  open: boolean
  onSchedule: (date: Date) => void
  onCancel: () => void
}

export default function ScheduleModal({ open, onSchedule, onCancel }: Props) {
  const [date, setDate] = useState<Date>()

  return (
    <Modal closeButton aria-labelledby="modal-title" open={open} onClose={onCancel}>
      <Modal.Header className="border-b border-white">
        <Text id="modal-title" size={18}>
          When do you want to schedule the post?
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="my-4">
            <ScheduleSelector onDateSelected={setDate} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={onCancel}>
          Cancel
        </Button>
        <button
          onClick={() => date && onSchedule(date)}
          type="button"
          className="rounded-md bg-indigo-500 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  )
}
