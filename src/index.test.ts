import { Paccurate, pack } from '.'
import type { Body } from './types'

const { PACCURATE_API_KEY } = process.env

const body = {
  itemSets: [
    {
      refId: 0,
      dimensions: {
        x: 5.5,
        y: 6,
        z: 6,
      },
      quantity: 3,
    },
  ],
  boxTypeSets: ['fedex'],
}

describe('Paccurate', () => {
  it('exports class', () => {
    expect(Paccurate).toBeInstanceOf(Function)
  })

  if (PACCURATE_API_KEY && typeof PACCURATE_API_KEY === 'string') {
    it('sends post request and returns response', async () => {
      const paccurate = new Paccurate(PACCURATE_API_KEY)
      const data = await paccurate.pack(body)
      expect(data).toMatchInlineSnapshot(
        {
          built: expect.any(String),
          boxes: expect.any(Array),
          packTime: expect.any(Number),
          renderTime: expect.any(Number),
          scripts: expect.any(String),
          styles: expect.any(String),
          svgs: expect.any(Array),
          totalTime: expect.any(Number),
          usedKeyStem: expect.any(String),
          version: expect.any(String),
        },
        `
        Object {
          "boxTypeChoiceGoalUsed": "lowest-cost",
          "boxes": Any<Array>,
          "built": Any<String>,
          "host": "api.paccurate.io",
          "itemSortUsed": "none",
          "leftovers": Array [],
          "lenBoxes": 1,
          "lenItems": 3,
          "lenLeftovers": 0,
          "packTime": Any<Number>,
          "renderTime": Any<Number>,
          "scripts": Any<String>,
          "styles": Any<String>,
          "svgs": Any<Array>,
          "title": "Default",
          "totalCost": 2550,
          "totalTime": Any<Number>,
          "usedKeyStem": Any<String>,
          "version": Any<String>,
        }
      `,
      )
    })

    it('responds with error if body is empty', async () => {
      await expect(pack(undefined as unknown as Body)).rejects.toMatchObject({
        code: 400,
        message: 'EOF',
      })
    })
  }
})

describe('pack', () => {
  it('exports function', () => {
    expect(pack).toBeInstanceOf(Function)
  })

  if (PACCURATE_API_KEY && typeof PACCURATE_API_KEY === 'string') {
    it('sends post request and returns response', async () => {
      const data = await pack({ ...body, key: PACCURATE_API_KEY })
      expect(data).toMatchInlineSnapshot(
        {
          built: expect.any(String),
          boxes: expect.any(Array),
          packTime: expect.any(Number),
          renderTime: expect.any(Number),
          scripts: expect.any(String),
          styles: expect.any(String),
          svgs: expect.any(Array),
          totalTime: expect.any(Number),
          usedKeyStem: expect.any(String),
          version: expect.any(String),
        },
        `
        Object {
          "boxTypeChoiceGoalUsed": "lowest-cost",
          "boxes": Any<Array>,
          "built": Any<String>,
          "host": "api.paccurate.io",
          "itemSortUsed": "none",
          "leftovers": Array [],
          "lenBoxes": 1,
          "lenItems": 3,
          "lenLeftovers": 0,
          "packTime": Any<Number>,
          "renderTime": Any<Number>,
          "scripts": Any<String>,
          "styles": Any<String>,
          "svgs": Any<Array>,
          "title": "Default",
          "totalCost": 2550,
          "totalTime": Any<Number>,
          "usedKeyStem": Any<String>,
          "version": Any<String>,
        }
      `,
      )
    })

    it('responds with error if body is empty', async () => {
      await expect(pack(undefined as unknown as Body)).rejects.toMatchObject({
        code: 400,
        message: 'EOF',
      })
    })
  }
})
