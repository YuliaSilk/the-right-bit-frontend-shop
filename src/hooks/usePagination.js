import {useState, useEffect} from "react";

export function usePagination(totalItems, size) {
 const [page, setPage] = useState(1);

 useEffect(() => {
  setPage(1);
 }, [size]);

 const totalPages = Math.ceil(totalItems / size);

 return {page, setPage, totalPages};
}
