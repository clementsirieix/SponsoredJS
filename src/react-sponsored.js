import _ from 'lodash'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { getRandomNumberInRange } from './utils'

function MessageFormatter (props) {
    const { messageChunks } = props

    return (
        <Fragment>
            {messageChunks.map((v, i) => {
                if (v.content) {
                    const BasicSpan = styled.span`
                        text-transform: lowercase;

                        ${props => props.isFirst && css`
                            display: inline-block;
                            &::first-letter {
                                text-transform: uppercase;
                            }
                        `}
                    `

                    return (
                        <BasicSpan
                            isFirst={i === 0}
                            key={i}
                        >
                            {v.content}
                        </BasicSpan>
                    )
                }
                const PlaceholderSpan = styled.span`
                    font-size: 0;
                    white-space: pre-wrap;
                `
                return (
                    <PlaceholderSpan key={i}>
                        {v.placeholder}
                    </PlaceholderSpan>
                )
            })}
        </Fragment>
    )
}

function Wrapping (props) {
    const { children, data } = props
    const v = data.pop()
    const Wrapper = styled.div`
        user-select: none;
    `

    return (
        <Wrapper {...v}>
            {data.length > 0 ?
                <Wrapping data={data}>
                    {children}
                </Wrapping>
            :
                children
            }
        </Wrapper>
    )
}

export default class Sponsored extends React.Component {

    static defaultProps = {
        style: {},
    }

    generateWrapperData = _.memoize(style => {
        const rngWrappers = getRandomNumberInRange(5, 8)

        return Array.from(new Array(rngWrappers), (v, i) =>
            i === 0 ? { style } : {}
        ).sort(() => 0.5 - Math.random())
    })

    generateMessageChunks = _.memoize(message =>
        Array.from(message).reduce((acc, v) => {
            if (acc.length === 0 || Math.random() < 0.5) {
                if (Math.random() < 0.5 && acc.length !== 0) {
                    acc.push({ placeholder: Math.random().toString(36).substring(11) })
                }

                acc.push({
                    content: Math.random() < 0.5 ? v.toLowerCase() : v.toUpperCase(),
                })
            } else {
                const lastEntry = acc.pop()
                acc.push({
                    content: Math.random() < 0.5 ?
                        lastEntry.content + v.toLowerCase()
                    :
                        lastEntry.content + v.toUpperCase()
                })
            }

            return acc
        }, [])
    )

    render() {
        const { message, style } = this.props

        return (
            <Wrapping data={this.generateWrapperData(style)}>
                <MessageFormatter messageChunks={this.generateMessageChunks(message)} />
            </Wrapping>
        )
    }
}

Sponsored.propTypes = {
    message: PropTypes.string.isRequired,
    style: PropTypes.object,
}
