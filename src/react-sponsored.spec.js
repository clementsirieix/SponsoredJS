import React from 'react'
import renderer from 'react-test-renderer'

import Sponsored from './react-sponsored'

describe('Sponsored', () => {
    test('should match first snapshot', () => {
        global.Math.random = () => 0.5
        const component = renderer.create(
            <Sponsored
                message="Sponsorisé"
                style={{ color: 'blue' }}
            />
        )

        expect(component.toJSON()).toMatchSnapshot()
    })

    test('should match second snapshot', () => {
        global.Math.random = () => 0.4
        const component = renderer.create(
            <Sponsored
                message="Sponsorisé"
                style={{ color: 'blue' }}
            />
        )

        expect(component.toJSON()).toMatchSnapshot()
    })
})
