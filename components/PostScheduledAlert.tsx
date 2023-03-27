import { CheckCircleIcon } from '@heroicons/react/20/solid'

interface Props {
  workflowId: string
  onDismiss: () => void
}

export default function PostScheduledAlert({ workflowId, onDismiss }: Props) {
  return (
    <div className="p-4 rounded-md bg-green-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="w-5 h-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Post scheduled</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              Your Lens post has been scheduled on{' '}
              <strong>
                <a href="https://chainjet.io">ChainJet</a>
              </strong>
              .
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <a href={`https://chainjet.io/workflows/${workflowId}`}>
                <button
                  type="button"
                  className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  View workflow on ChainJet
                </button>
              </a>
              <button
                onClick={onDismiss}
                type="button"
                className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
