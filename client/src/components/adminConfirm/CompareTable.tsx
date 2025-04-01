

function CompareTable() {
  return (
    <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Compare</h2>

          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="grid grid-cols-3 border-b">
              <div className="p-6 font-semibold text-gray-800">Features</div>
              <div className="p-6 font-semibold text-primary text-center">RapidRoom</div>
              <div className="p-6 font-semibold text-gray-600 text-center">Competitors</div>
            </div>

            {[
              { title: "Guest identity verification", rapidRoom: true, competitors: true },
              { title: "Reservation screening", rapidRoom: true, competitors: false },
              { title: "$3m USD damage protection", rapidRoom: true, competitors: false },
              { title: "Art & valuables coverage", rapidRoom: true, competitors: false },
              { title: "Auto & boat coverage", rapidRoom: true, competitors: true },
              { title: "Pet damage protection", rapidRoom: true, competitors: false },
              { title: "Income loss protection", rapidRoom: true, competitors: false },
              { title: "24-hour safety line", rapidRoom: true, competitors: true },
            ].map((item, index) => (
              <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <div className="p-6 text-gray-700">{item.title}</div>
                <div className="p-6 flex justify-center items-center">
                  {item.rapidRoom ? (
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="p-6 flex justify-center items-center">
                  {item.competitors ? (
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}

export default CompareTable;
