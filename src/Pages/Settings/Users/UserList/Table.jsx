import { Link } from "react-router-dom";

const headTitle1 = ["موضوع", "  واحد مربوطه ", "اهمیت", "وضعیت", "زمان", ""];

const Table = ({
  TableData = [],
  headTitle = headTitle1,
  hasPagination = true,
  children,
  className
}) => {
  // const {locale} = useRouter()
  // const {t} = useTranslation()
  return (
    <>
      <div class="w-full mx-auto px-4 sm:px-8">
        <div class="py-8">
          <div class="-mx-4 sm:-mx-8 px-4  py-4 overflow-auto">
            <div class={`inline-block min-w-[1070px] w-full shadow-md rounded-lg overflow-hidden ${className}`}>
              <table class="min-w-full leading-normal border-collapse">
                
                <thead>
                  <tr className="bg-[#DBDBDB] border-b-2 text-[#0077B6] text-base ">
                    {headTitle.map((h) => {
                      return (
                        <th key={h} class="px-3 py-1 text-left font-semibold">
                          {h}
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {children
                    ? children
                    : TableData.map((d) => {
                        return (
                          <tr
                            key={d.details_id}
                            className="title-color py-4 h-24  even:bg-[#F3F3F3] text-2xl"
                          >
                            <td className="px-5 py-3">aaaa</td>
                            <td className="px-5 py-3">aaa</td>
                            <td className="px-5 py-3">
                              dddd</td>
                           
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Table;
