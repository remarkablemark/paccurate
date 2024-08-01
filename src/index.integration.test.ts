import { type Body, Paccurate, pack, type PackBody } from '.'

const PACCURATE_API_KEY = process.env.PACCURATE_API_KEY!

const it = PACCURATE_API_KEY ? test : test.skip

const body: Body = {
  itemSets: [
    {
      refId: 0,
      dimensions: {
        x: 5.5,
        y: 6,
        z: 6,
      },
      quantity: 3,
      weight: 4.5,
    },
  ],
  boxTypeSets: ['fedex'],
}

describe('Paccurate', () => {
  it('sends post request to default endpoint', async () => {
    const paccurate = new Paccurate(PACCURATE_API_KEY)
    const data = await paccurate.pack(body)
    expect(data).toMatchInlineSnapshot(
      {
        built: expect.any(String),
        boxes: expect.any(Array),
        packTime: expect.any(Number),
        packUuid: expect.any(String),
        renderTime: expect.any(Number),
        requestFingerprint: expect.any(String),
        responseFingerprint: expect.any(String),
        startedAt: expect.any(String),
        svgs: expect.any(Array),
        totalTime: expect.any(Number),
        usedKeyStem: expect.any(String),
        version: expect.any(String),
      },
      `
        {
          "boxTypeChoiceGoalUsed": "lowest-cost",
          "boxes": Any<Array>,
          "built": Any<String>,
          "host": "api.paccurate.io",
          "itemSortReverseUsed": false,
          "itemSortUsed": "none",
          "leftovers": [],
          "lenBoxes": 1,
          "lenItems": 3,
          "lenLeftovers": 0,
          "lenUnits": 3,
          "packTime": Any<Number>,
          "packUuid": Any<String>,
          "renderTime": Any<Number>,
          "requestFingerprint": Any<String>,
          "responseFingerprint": Any<String>,
          "startedAt": Any<String>,
          "svgs": Any<Array>,
          "title": "Default",
          "totalCost": 2550,
          "totalTime": Any<Number>,
          "totalVolume": 1334.8125,
          "totalVolumeNet": 594,
          "totalVolumeUsed": 594,
          "totalVolumeUtilization": 0.44500632,
          "totalWeight": 13.5,
          "usedKeyStem": Any<String>,
          "version": Any<String>,
        }
      `,
    )
  })

  it('sends post request to cloud endpoint', async () => {
    const paccurate = new Paccurate(PACCURATE_API_KEY, 'https://cloud.api.paccurate.io/')
    const data = await paccurate.pack(body)
    expect(data).toMatchInlineSnapshot(
      {
        built: expect.any(String),
        boxes: expect.any(Array),
        packTime: expect.any(Number),
        packUuid: expect.any(String),
        renderTime: expect.any(Number),
        requestFingerprint: expect.any(String),
        responseFingerprint: expect.any(String),
        startedAt: expect.any(String),
        svgs: expect.any(Array),
        totalTime: expect.any(Number),
        usedKeyStem: expect.any(String),
        version: expect.any(String),
      },
      `
        {
          "boxTypeChoiceGoalUsed": "lowest-cost",
          "boxes": Any<Array>,
          "built": Any<String>,
          "host": "cloud.api.paccurate.io",
          "itemSortReverseUsed": false,
          "itemSortUsed": "none",
          "leftovers": [],
          "lenBoxes": 1,
          "lenItems": 3,
          "lenLeftovers": 0,
          "lenUnits": 3,
          "packTime": Any<Number>,
          "packUuid": Any<String>,
          "renderTime": Any<Number>,
          "requestFingerprint": Any<String>,
          "responseFingerprint": Any<String>,
          "startedAt": Any<String>,
          "svgs": Any<Array>,
          "title": "Default",
          "totalCost": 2550,
          "totalTime": Any<Number>,
          "totalVolume": 1334.8125,
          "totalVolumeNet": 594,
          "totalVolumeUsed": 594,
          "totalVolumeUtilization": 0.44500632,
          "totalWeight": 13.5,
          "usedKeyStem": Any<String>,
          "version": Any<String>,
        }
      `,
    )
  })

  test('responds with error if body is empty', async () => {
    await expect(pack(undefined as unknown as PackBody)).rejects.toMatchObject({
      code: 400,
      message: 'EOF',
    })
  })
})

describe('pack', () => {
  it('sends post request to default endpoint', async () => {
    const data = await pack({ ...body, key: PACCURATE_API_KEY })
    expect(data).toMatchInlineSnapshot(
      {
        built: expect.any(String),
        boxes: expect.any(Array),
        packTime: expect.any(Number),
        packUuid: expect.any(String),
        renderTime: expect.any(Number),
        requestFingerprint: expect.any(String),
        responseFingerprint: expect.any(String),
        startedAt: expect.any(String),
        svgs: expect.any(Array),
        totalTime: expect.any(Number),
        usedKeyStem: expect.any(String),
        version: expect.any(String),
      },
      `
        {
          "boxTypeChoiceGoalUsed": "lowest-cost",
          "boxes": Any<Array>,
          "built": Any<String>,
          "host": "api.paccurate.io",
          "itemSortReverseUsed": false,
          "itemSortUsed": "none",
          "leftovers": [],
          "lenBoxes": 1,
          "lenItems": 3,
          "lenLeftovers": 0,
          "lenUnits": 3,
          "packTime": Any<Number>,
          "packUuid": Any<String>,
          "renderTime": Any<Number>,
          "requestFingerprint": Any<String>,
          "responseFingerprint": Any<String>,
          "startedAt": Any<String>,
          "svgs": Any<Array>,
          "title": "Default",
          "totalCost": 2550,
          "totalTime": Any<Number>,
          "totalVolume": 1334.8125,
          "totalVolumeNet": 594,
          "totalVolumeUsed": 594,
          "totalVolumeUtilization": 0.44500632,
          "totalWeight": 13.5,
          "usedKeyStem": Any<String>,
          "version": Any<String>,
        }
      `,
    )
  })

  it('sends post request to cloud endpoint', async () => {
    const data = await pack({ ...body, key: PACCURATE_API_KEY }, 'https://cloud.api.paccurate.io/')
    expect(data).toMatchInlineSnapshot(
      {
        built: expect.any(String),
        boxes: expect.any(Array),
        packTime: expect.any(Number),
        packUuid: expect.any(String),
        renderTime: expect.any(Number),
        requestFingerprint: expect.any(String),
        responseFingerprint: expect.any(String),
        startedAt: expect.any(String),
        svgs: expect.any(Array),
        totalTime: expect.any(Number),
        usedKeyStem: expect.any(String),
        version: expect.any(String),
      },
      `
        {
          "boxTypeChoiceGoalUsed": "lowest-cost",
          "boxes": Any<Array>,
          "built": Any<String>,
          "host": "cloud.api.paccurate.io",
          "itemSortReverseUsed": false,
          "itemSortUsed": "none",
          "leftovers": [],
          "lenBoxes": 1,
          "lenItems": 3,
          "lenLeftovers": 0,
          "lenUnits": 3,
          "packTime": Any<Number>,
          "packUuid": Any<String>,
          "renderTime": Any<Number>,
          "requestFingerprint": Any<String>,
          "responseFingerprint": Any<String>,
          "startedAt": Any<String>,
          "svgs": Any<Array>,
          "title": "Default",
          "totalCost": 2550,
          "totalTime": Any<Number>,
          "totalVolume": 1334.8125,
          "totalVolumeNet": 594,
          "totalVolumeUsed": 594,
          "totalVolumeUtilization": 0.44500632,
          "totalWeight": 13.5,
          "usedKeyStem": Any<String>,
          "version": Any<String>,
        }
      `,
    )
  })

  test('responds with error if body is empty', async () => {
    await expect(pack(undefined as unknown as PackBody)).rejects.toMatchObject({
      code: 400,
      message: 'EOF',
    })
  })
})
