import { IQuiz } from '../core/schemas'
import path from 'path'
import { writeFileUtf8 } from '../utils/file-util'

export interface IDatabaseExport {
  quizzes: IQuiz[]
}

export class BackendExporter {
  #filesPath: string
  constructor(studioFilesPath: string) {
    this.#filesPath = studioFilesPath
  }
  async exportFiles(databaseContent: { quizzes: IQuiz[] }): Promise<void> {
    // TODO : use file utils to write databaseContent to this.#filesPath/quizzes.json
    try {
      const filePath = path.join(this.#filesPath, 'quizzes.json') // Path for the export file

      // Convert the data to a formatted JSON string
      const jsonData = JSON.stringify(databaseContent, null, 2)

      // Write the JSON data to the file using writeFileUtf8
      await writeFileUtf8(filePath, jsonData)

      console.log(`Exported quizzes to ${filePath}`)
    } catch (error) {
      console.error('Error exporting files:', error)
    }
  }
}
