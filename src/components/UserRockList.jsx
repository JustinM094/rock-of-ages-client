import { useEffect, useState } from "react";

export const UserRockList = ({ rocks, fetchUserRocks }) => {
  useEffect(() => {
    fetchUserRocks();
  }, []);

  const displayUserRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          <div>
            {rock.name} ({rock.type.label}) weighs {rock.weight}
          </div>
          <div>
            In the Collection of{" "}
            {rock.user
              ? `${rock.user.first_name} ${rock.user.last_name}`
              : "Unknown"}
          </div>
          <div>
            <button
              onClick={async () => {
                const response = await fetch(
                  `http://localhost:8000/rocks/${rock.id}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Token ${
                        JSON.parse(localStorage.getItem("rock_token")).token
                      }`,
                    },
                  }
                );

                if (response.status === 204) {
                  fetchUserRocks();
                }
              }}
              className="border border-solid bg-red-700 text-white p-1"
            >
              Delete
            </button>
          </div>
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Your Rock Collection</h1>
      {displayUserRocks()}
    </>
  );
};
