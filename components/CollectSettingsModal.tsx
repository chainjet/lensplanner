import { CollectionSettings } from '@/utils/types'
import { Button, Checkbox, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'

interface Props {
  open: boolean
  onConfirm: (collectionSettings: CollectionSettings) => void
  onCancel: () => void
}

export default function CollectSettingsModal({ open, onConfirm, onCancel }: Props) {
  const [collect, setCollect] = useState('anyone')
  const [paidCollect, setPaidCollect] = useState(false)
  const [collectFee, setCollectFee] = useState('1')
  const [collectCurrency, setCollectCurrency] = useState('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270')
  const [mirrorReferral, setMirrorReferral] = useState('0')
  const [maxCollects, setMaxCollects] = useState('0')
  const [collectTimeLimit, setCollectTimeLimit] = useState(false)

  const handleConfirm = () => {
    onConfirm({
      collect,
      paidCollect,
      collectFee: Number(collectFee),
      collectCurrency,
      mirrorReferral: Number(mirrorReferral),
      maxCollects: Number(maxCollects),
      collectTimeLimit,
    })
  }

  return (
    <Modal closeButton aria-labelledby="modal-title" open={open} onClose={onCancel}>
      <Modal.Header className="border-b border-white">
        <Text id="modal-title" size={18}>
          Collect Settings
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="my-4">
            {/* Selector showing who can collect the post */}
            <div>
              <Text>Who can collect the post?</Text>
              <div className="flex items-center">
                <select
                  className="block w-full mt-1 text-white bg-black"
                  value={collect}
                  onChange={(e) => setCollect(e.target.value)}
                >
                  <option key={0} value="anyone">
                    Anyone
                  </option>
                  <option key={1} value="followers">
                    Only followers
                  </option>
                  <option key={2} value="none">
                    No one
                  </option>
                </select>
              </div>
            </div>
            {collect !== 'none' && (
              <div className="mt-4">
                <Checkbox value="paidCollect" isSelected={paidCollect} onChange={setPaidCollect}>
                  <span className="block text-sm font-medium leading-6">Charge for collecting</span>
                </Checkbox>
              </div>
            )}
            {collect !== 'none' && paidCollect && (
              <div className="mt-4">
                <div>
                  <label htmlFor="collectFee" className="block text-sm font-medium leading-6">
                    Collection Fee
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      value={collectFee}
                      onChange={(e) => setCollectFee(e.target.value)}
                      type="text"
                      name="collectFee"
                      id="collectFee"
                      className="block w-full rounded-md border-0 py-1.5 pr-20 bg-black text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor="currency" className="sr-only">
                        Currency
                      </label>
                      <select
                        value={collectCurrency}
                        onChange={(e) => setCollectCurrency(e.target.value)}
                        id="collectCurrency"
                        name="collectCurrency"
                        className="h-full py-0 pl-2 text-gray-500 bg-transparent border-0 rounded-md pr-7 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      >
                        <option value="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174">USDC (USD Coin)</option>
                        <option value="0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063">DAI (Dai Stablecoin)</option>
                        <option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">WETH (Wrapped Ether)</option>
                        <option value="0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270">WMATIC (Wrapped Matic)</option>
                        <option value="0xD838290e877E0188a4A44700463419ED96c16107">NCT (Nature Carbon Tonne)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <label htmlFor="mirrorReferral" className="block text-sm font-medium leading-6">
                      Mirror referral percentage
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <input
                        value={mirrorReferral}
                        onChange={(e) => setMirrorReferral(e.target.value)}
                        type="text"
                        name="mirrorReferral"
                        id="mirrorReferral"
                        className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        aria-describedby="mirrorReferral-description"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm" id="mirrorReferral-percentage">
                          %
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500" id="maxCollects-description">
                      Share your fee with people who mirrors your content.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <label htmlFor="maxCollects" className="block text-sm font-medium leading-6">
                      Max number of collects allowed
                    </label>
                    <div className="mt-2">
                      <input
                        value={maxCollects}
                        onChange={(e) => setMaxCollects(e.target.value)}
                        type="number"
                        name="maxCollects"
                        id="maxCollects"
                        className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        aria-describedby="collectFee-description"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500" id="maxCollects-description">
                      Limit the maximum number of collects allowed. Set to 0 to disable.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Checkbox value="collectTimeLimit" isSelected={collectTimeLimit} onChange={setCollectTimeLimit}>
                    <span className="block text-sm font-medium leading-6">Limit collecting to the first 24h</span>
                  </Checkbox>
                  <p className="text-sm text-gray-500" id="maxCollects-description">
                    Limit the collection to the first 24h after the post is created.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={onCancel}>
          Cancel
        </Button>
        <button
          onClick={handleConfirm}
          type="button"
          className="rounded-md bg-indigo-500 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  )
}
