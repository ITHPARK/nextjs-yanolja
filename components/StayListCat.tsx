"use client"

import React, {useState, useEffect, useCallback} from 'react'
import {StayInfo, rowProps2} from '@/types/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import clsx from 'clsx';
import {useRouter} from 'next/navigation'


const StayListCat:React.FC<rowProps2> = ({rowData}) => {

    const [data, setData] = useState<StayInfo[][]>([]);

    const {push} = useRouter();

    const boxStyleClass= clsx(
        'p-[10px]',
        'flex-1',
        'border-r-[1px]', // 공통 클래스
        `border-solid`, // 색상 클래스
        `border-[#ddd]`, // 테두리 클래스
        'text-[12px]'
    )

    useEffect(() => {
        if (rowData && rowData.length > 0) {
          console.log('rowData가 있습니다:', rowData);
          setData([...rowData]);  // 데이터를 깊은 복사하여 상태에 설정
        } else {
          console.log('rowData가 없습니다');
        }
      }, [rowData]);


      const handleClick: React.MouseEventHandler<HTMLDivElement> =  useCallback((event) => {
        const target = event.currentTarget;
        const id = target.getAttribute('data-id');
        if (id) {
          push( `/place/${id}`);
        }
      }, [push]);
    

  return (
    <section className='mb-[50px] px-[20px]'>
        <Tabs defaultValue="account" className=" w-full h-auto">
            <TabsList className='w-full h-auto justify-start w-full bg-[none] border-b-[1px] border-solid border-[#ddd] '>
                <TabsTrigger className={boxStyleClass} value="top">Top 숙소</TabsTrigger>
                <TabsTrigger className={boxStyleClass} value="popular">인기있는 숙소</TabsTrigger>
                <TabsTrigger className={boxStyleClass} value="mostVisit">방문 많은 숙소</TabsTrigger>
                <TabsTrigger className={`${boxStyleClass} border-r-[0]`} value="mostLike">좋아요 많은 숙소</TabsTrigger>
            </TabsList>
            <div className='mt-[10px] border-t-[1px] border-solid border-[#ddd]'>
            {
                data && 
                data.map((item: StayInfo[], index: number) => {
                    return (
                        <div className='' key={`ranking${index}`}>
                            
                            <TabsContent  value={index === 0 ? "top" : (index === 1 ? "popular" : (index === 2 ? "mostVisit" : (index === 3 ? "mostLike" : "")))} className='mt-0 flex flex-wrap '>
                                {
                                    item && item.map((data:StayInfo, index: number ) => {
                                        return (
                                            <div className='p-[20px] w-[calc(50%-1px)] flex gap-[10px] border-b-[1px] border-solid border-[#ddd] odd:border-r-[1px] odd:border-solid odd:border-[#ddd] cursor-pointer' key={data.contentid}  onClick={handleClick} data-id={data.contentid}>
                                                <div className='w-full max-w-[140px] h-[168px] relative  '>
                                                    <div
                                                        className='w-full h-full relative bg-cover bg-center'
                                                        style={{ backgroundImage: `url(${data.firstimage})` }}
                                                    >
                                                        <span className=' w-[15px] h-[15px] flex justify-center items-center  text-[12px] text-[#fff] font-[600] bg-[#000]'>{index+1}</span>
                                                    </div>
                                                </div>
                                                <div className='flex-1 flex flex-col justify-between'>
                                                    <div>
                                                        <p className='text-[14px] font-[600] leading-[1.2]'>{data.title}</p>
                                                        <span className='mt-[3px] flex items-center text-[12px] font-[600]'>
                                                            <span className='w-[12px] h-[12px] inline-block'>
                                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.1149 9.25905L15.8636 8.47606C15.4878 8.42386 15.1746 8.19418 15.0076 7.84966L12.6586 3.08907C12.5855 2.94291 12.4707 2.82807 12.3245 2.75499C11.9591 2.57751 11.5206 2.72367 11.3327 3.08907L8.98373 7.84966C8.81669 8.18374 8.49306 8.42386 8.12766 8.47606L2.87639 9.23817C2.7198 9.25905 2.5632 9.33213 2.4588 9.45741C2.32308 9.59312 2.25 9.79148 2.25 9.9794C2.25 10.1778 2.33352 10.3657 2.46924 10.5014L6.26936 14.2076C6.5408 14.4686 6.65564 14.8444 6.593 15.2202L5.69517 20.4506C5.67429 20.5863 5.69517 20.7221 5.73693 20.8578C5.78912 20.9831 5.87264 21.0979 5.98748 21.1814C6.10232 21.2649 6.2276 21.3067 6.36332 21.3171C6.49904 21.3171 6.63476 21.2962 6.76004 21.2336L11.458 18.7594C11.7921 18.5819 12.1888 18.5819 12.5229 18.7594L17.2208 21.2336C17.367 21.3067 17.534 21.338 17.6906 21.3067C18.0873 21.2336 18.3588 20.8578 18.2961 20.4611L17.3983 15.2307C17.3356 14.8653 17.4609 14.4894 17.7219 14.218L21.522 10.5118C21.6369 10.397 21.71 10.2508 21.7413 10.0942C21.8039 9.68708 21.522 9.32169 21.1149 9.25905Z" fill="#FDBD00"></path><path clipRule="evenodd" d="M10.8881 2.86032C11.1993 2.25507 11.9314 2.00812 12.543 2.30516L12.5481 2.30767C12.791 2.42913 12.9843 2.62246 13.1058 2.86539L13.107 2.86775L15.4575 7.63144C15.5528 7.82802 15.7244 7.95184 15.9324 7.98073L15.9374 7.98142L21.1909 8.76478C21.857 8.86726 22.3422 9.47631 22.2355 10.1702L22.2338 10.1813L22.2316 10.1922C22.1827 10.4365 22.0665 10.6744 21.8756 10.8653L21.8712 10.8697L18.0775 14.5696C17.9224 14.7339 17.8575 14.95 17.8911 15.1461L18.79 20.383C18.8957 21.0524 18.4402 21.6749 17.7848 21.7977C17.5011 21.8534 17.2225 21.7934 16.9972 21.6807L16.9878 21.676L12.2899 19.2017L12.2883 19.2008C12.1009 19.1013 11.88 19.1013 11.6926 19.2008L11.691 19.2017L6.98369 21.6808C6.76748 21.789 6.54838 21.8171 6.36332 21.8171H6.34412L6.32497 21.8156C6.10569 21.7987 5.88991 21.7286 5.6934 21.5857C5.49494 21.4414 5.35813 21.2486 5.27539 21.05L5.26612 21.0278L5.25904 21.0047C5.20428 20.8268 5.16465 20.6106 5.20098 20.3745L5.2023 20.3659L6.0998 15.138C6.09986 15.1376 6.09992 15.1373 6.09997 15.1369C6.13687 14.9136 6.06759 14.7071 5.9228 14.5679L5.92025 14.5654L2.11566 10.8549C1.89155 10.6308 1.75 10.3177 1.75 9.97933C1.75 9.6801 1.86089 9.35762 2.08961 9.11973C2.28696 8.89312 2.55812 8.7768 2.80705 8.74292L8.05585 7.98116L8.05695 7.98101C8.25294 7.95301 8.43916 7.81987 8.53602 7.62698C8.53618 7.62665 8.53635 7.62631 8.53652 7.62598L10.8881 2.86032ZM11.7788 3.31492L9.43212 8.07083L9.43095 8.07319C9.1937 8.54769 8.73327 8.89427 8.19914 8.97085C8.19888 8.97088 8.19939 8.97081 8.19914 8.97085L2.94248 9.73374C2.91721 9.73711 2.89363 9.74459 2.87486 9.75414C2.85639 9.76355 2.84691 9.77262 2.84291 9.77742L2.82839 9.79485L2.81235 9.81088C2.78022 9.84302 2.75 9.90945 2.75 9.97933C2.75 10.037 2.77488 10.099 2.82117 10.1461L6.61591 13.8471C6.61639 13.8475 6.61688 13.848 6.61736 13.8485C7.01416 14.2309 7.17408 14.775 7.08619 15.3024L7.08579 15.3047L6.18893 20.5295C6.18454 20.5614 6.18636 20.6091 6.20723 20.6847C6.22791 20.7266 6.25437 20.7572 6.28157 20.777C6.31092 20.7983 6.34156 20.8113 6.38438 20.8168C6.45586 20.8148 6.50177 20.8029 6.53316 20.7879L11.2234 18.3177C11.2237 18.3175 11.2241 18.3174 11.2244 18.3172C11.7046 18.0625 12.2762 18.0625 12.7565 18.3172C12.7568 18.3174 12.7571 18.3175 12.7574 18.3177L17.4481 20.7882C17.5124 20.8194 17.5649 20.8218 17.5925 20.8163L17.6 20.8148C17.7353 20.7899 17.8205 20.6634 17.8026 20.5413L16.9055 15.3152C16.8142 14.7826 16.9981 14.2493 17.3615 13.8714L17.3671 13.8656L21.1701 10.1566C21.2058 10.1202 21.2339 10.0703 21.2484 10.008C21.2611 9.89116 21.1832 9.7758 21.0398 9.7533C21.0395 9.75325 21.0401 9.75334 21.0398 9.7533L15.7948 8.97123C15.7939 8.9711 15.793 8.97097 15.7921 8.97084C15.2503 8.89468 14.797 8.5601 14.5584 8.06936C14.5582 8.06881 14.5579 8.06827 14.5576 8.06772L12.2114 3.3126C12.2112 3.3123 12.2111 3.312 12.2109 3.31169C12.1867 3.26364 12.1513 3.22798 12.1035 3.20347C11.9857 3.14781 11.8436 3.19233 11.7788 3.31492Z" fill="#B46D0E"></path></svg>
                                                            </span>
                                                            {data.rating}
                                                        </span>
                                                        <p className='text-[#6d6d6d] tracking-[-0.045em]'>일반숙소</p>
                                                    </div>
                                                    <div className='flex flex-col justify-end items-end'>   
                                                        <span className='text-[12px] text-[#1a1a1a]'>숙박 15:00~</span>
                                                        <span className='text-[18px] text-[#1a1a1a] font-[600]'>{data.price}~</span>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                
                            </TabsContent>
                        </div>
                    )
                })
            }
            </div>
        </Tabs>
    </section>
  )
}

export default StayListCat