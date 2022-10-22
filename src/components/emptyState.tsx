/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import Image from "next/image";

// App imports
import EmptyImage from "@assets/empty-state.png";

/* ––
 * –––– Component declaration
 * –––––––––––––––––––––––––––––––––– */
export default function EmptyState({ callback }: { callback: () => void }) {
  return (
    <div className="flex-1 max-w-5xl justify-center m-auto mt-12">
      <div className="flex items-center flex-wrap sm:flex-nowrap justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mt-4">Uh oh.</h1>
          <p className="text-gray-500 text-center my-2">
            We ran into an issue, but don’t worry, we’ll take care of it for
            sure.
          </p>
          <button
            className="bg-primary text-white px-6 py-2 rounded-md my-8"
            onClick={callback}
          >
            Back to safely
          </button>
        </div>
        <Image src={EmptyImage} alt="empty state" className="w-20" />
      </div>
    </div>
  );
}
