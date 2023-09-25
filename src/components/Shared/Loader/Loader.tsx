import { IconLoader } from '@tabler/icons-react'

export default function Loader() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex gap-2 px-4 py-2 bg-gray-100 rounded-lg items-center ">
        <span className="text-gray-700 text-sm">Loading</span>
        <IconLoader className="animate-spin text-gray-700" size={16} />
      </div>
    </div>
  )
}
