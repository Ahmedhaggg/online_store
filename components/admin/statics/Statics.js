import { Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import StaticItem from './StaticItem'

export default function Statics({ stats }) {
    return (
        <Grid container spacing={3}>
            {
                stats.map((state, index) => (
                    <Link href={"/admin/" + state.staticName.split(" ").pop()}>
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <StaticItem staticLength={state.staticLength} staticName={state.staticName} index={index} />
                        </Grid>
                    </Link>
                ))
            }
        </Grid>
    )
}
