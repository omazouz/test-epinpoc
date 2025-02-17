import path from 'path'
import { IBackendConfig } from '../../app'
import QuizModel, { IQuiz } from '../core/schemas/quiz.schema'
import { BackendExporter } from './backend-exporter'
import { BackendImporter, IFileImport } from './backend-importer'

export class FileManagerService {
  #filesPath: string
  async init(config: IBackendConfig) {
    this.#filesPath = path.resolve(__dirname, config.filesPath)
  }

  async importFilesIntoDatabase(): Promise<void> {
    const importer: BackendImporter = new BackendImporter(this.#filesPath)
    const importResult: IFileImport = await importer.importFiles()
    // TODO : import all quizzes from file rather than only the first one
    if (importResult.quizzes.length > 0) {
      //  insert all quizzes
      await QuizModel.insertMany(importResult.quizzes)
      console.log(`Successfully imported ${importResult.quizzes.length} quizzes.`)
    } else {
      console.log('No quizzes found to import.')
    }
  }

  async exportDatabaseToFiles() {
    const exporter: BackendExporter = new BackendExporter(this.#filesPath)
    
    // TODO : get quizzes from database with QuizModel and put in files obj
    try {
      // Fetch quizzes from the database
      const quizzes: IQuiz[] = await QuizModel.find().lean().exec()

      // Export the quizzes to a file
      await exporter.exportFiles({quizzes})
      // console.log(`Successfully exported ${quizzes.length} quizzes to files.`)
    } catch (error) {
      console.error('Error exporting database:', error)
    }
  }
}
