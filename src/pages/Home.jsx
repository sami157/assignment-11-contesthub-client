import React from 'react'

export default function Home() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='title-font text-2xl'>Welcome to Contesthub</div>
            <div>Beautiful big banner with a search bar
                {/* Search works by contest types (search logic in backend). Make this section look unique and attractive */}
            </div>
            <div>
                Popular Contests Section
                {/* (show at least 5)
                ○	Sorted by highest participation count
                ○	For each contest show:
                • Contest Name
                • Creative image/card design
                • Participants count
                • Short description (use slice + “…”)
                • Details button → goes to contest details page
                ○	If not logged in → clicking Details sends user to Login page
                ○	“Show All” button → goes to All Contests page */}

            </div>
            <div>
                Winner Advertisement Section
                {/* ○	Beautiful section to motivate users
                ○	Show recent winners, prize money, total winners, etc.
                ○	Use nice images and inspiring text */}
            </div>
            <div>
                Extra Static Section
                {/* Maybe stats about the website? */}
            </div>
        </div>
    )
}
